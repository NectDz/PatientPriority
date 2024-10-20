import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

// Firebase initialization
const db = getFirestore();

function AppointmentDetail() {
  const { id } = useParams(); // Get the appointment ID from the URL parameters
  const [appointment, setAppointment] = useState(null);
  const [audioFile, setAudioFile] = useState(null); // For audio upload
  const [uploading, setUploading] = useState(false); // Loading state for upload
  const [loading, setLoading] = useState(true); // Loading state for fetching the appointment
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const appointmentDoc = await getDoc(doc(db, "appointment", id));
        if (appointmentDoc.exists()) {
          setAppointment(appointmentDoc.data());
        } else {
          console.error("Appointment not found");
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
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

      const response = await fetch("http://localhost:3000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const transcript = await response.text();

        // Update the appointment with the transcript in Firestore
        await updateDoc(doc(db, "appointment", id), {
          appointmentTranscript: transcript,
        });

        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          appointmentTranscript: transcript,
        }));

        setMessage("Transcript uploaded and saved.");
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

  if (!appointment) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Heading>Appointment not found</Heading>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Appointment Details
      </Heading>
      <Box p={6} bg="white" borderRadius="md" boxShadow="md">
        <Text>
          <strong>Patient Name:</strong> {appointment.patientName}
        </Text>
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
          <strong>Description:</strong> {appointment.appointmentDescription}
        </Text>
      </Box>
      <Divider my={6} />{" "}
      {/* Separator between appointment details and transcript */}
      {/* Transcript Section */}
      <Box p={6} bg="gray.50" borderRadius="md" boxShadow="md">
        <Heading as="h2" size="lg" mb={4}>
          Appointment Transcript
        </Heading>

        {appointment.appointmentTranscript ? (
          <Box
            p={4}
            bg="white"
            borderWidth="1px"
            borderRadius="md"
            overflow="auto"
            maxH="450px"
          >
            <Text whiteSpace="pre-wrap">
              {appointment.appointmentTranscript}
            </Text>
          </Box>
        ) : (
          <Text>No transcript available for this appointment.</Text>
        )}
      </Box>
      {/* Conditionally render buttons if there's no transcript */}
      {!appointment.appointmentTranscript && (
        <Box mt={6}>
          <Input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            display="none"
            id="audio-upload"
          />
          <Button as="label" htmlFor="audio-upload" colorScheme="blue" mt={4}>
            Select Audio
          </Button>
          <Button
            onClick={handleUpload}
            colorScheme="green"
            mt={4}
            isLoading={uploading}
          >
            Upload and Transcribe
          </Button>
        </Box>
      )}
      {message && <Box mt={4}>{message}</Box>}
    </Box>
  );
}

export default AppointmentDetail;
