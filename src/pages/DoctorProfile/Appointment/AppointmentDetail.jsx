import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

// Firebase initialization
const db = getFirestore();

function AppointmentDetail() {
  const { id } = useParams(); // Get appointment ID from route parameters
  const [appointment, setAppointment] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState(""); // State to store transcription text
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const appointmentDoc = await getDoc(doc(db, "appointment", id));
        if (appointmentDoc.exists()) {
          setAppointment(appointmentDoc.data());
          setTranscription(appointmentDoc.data().appointmentTranscript || ""); // Load existing transcript
        } else {
          setMessage("Appointment not found.");
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
        setMessage("Error loading appointment details.");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointment();
  }, [id]);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setMessage("Please select an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setUploading(true);
      setMessage("");
      setTranscription("");

      const response = await fetch("http://localhost:3000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const text = await response.text();
        setTranscription(text); // Display transcription text

        // Step 3: Update the appointment object in Firestore with the transcription
        await updateDoc(doc(db, "appointment", id), {
          appointmentTranscript: text,
        });

        setMessage("Transcription successful and saved to the appointment.");
      } else {
        setMessage("Error during transcription.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        gap={4}
      >
        {appointment ? (
          <>
            <Heading>Appointment Details</Heading>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              w="80%"
              bg="gray.100"
            >
              <Text>
                <strong>Date:</strong>{" "}
                {new Date(
                  appointment.appointmentDate.seconds * 1000
                ).toLocaleDateString()}
              </Text>
              <Text>
                <strong>Time:</strong>{" "}
                {new Date(
                  appointment.appointmentDate.seconds * 1000
                ).toLocaleTimeString()}
              </Text>
              <Text>
                <strong>Description:</strong>{" "}
                {appointment.appointmentDescription}
              </Text>
            </Box>

            <Heading mt={8}>Upload Audio File</Heading>
            <Input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              display="none"
              id="audio-upload"
            />
            <Button as="label" htmlFor="audio-upload" colorScheme="blue">
              Select Audio
            </Button>
            <Button
              onClick={handleUpload}
              colorScheme="green"
              isLoading={uploading}
              mt={4}
            >
              Upload and Transcribe
            </Button>
            {message && <Box mt={4}>{message}</Box>}

            {transcription && (
              <Box
                mt={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                w="80%"
                bg="gray.100"
              >
                <Heading size="md" mb={2}>
                  Transcription:
                </Heading>
                <Text whiteSpace="pre-wrap">{transcription}</Text>
              </Box>
            )}
          </>
        ) : (
          <Text>{message}</Text>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default AppointmentDetail;
