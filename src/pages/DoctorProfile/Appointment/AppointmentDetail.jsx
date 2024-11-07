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
import {
  getFirestore,
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

function AppointmentDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(""); // Add state for summary

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const appointmentDoc = await getDoc(doc(db, "appointment", id));
        if (appointmentDoc.exists()) {
          const appointmentData = appointmentDoc.data();
          setAppointment(appointmentData);

          const patientsQuery = query(
            collection(db, "patients"),
            where("id", "==", appointmentData.patient_id)
          );

          const patientsSnapshot = await getDocs(patientsQuery);
          if (!patientsSnapshot.empty) {
            const patientData = patientsSnapshot.docs[0].data();
            setPatientName(`${patientData.firstName} ${patientData.lastName}`);
          } else {
            setPatientName("Unknown Patient");
          }
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

        await updateDoc(doc(db, "appointment", id), {
          appointmentTranscript: transcript,
        });

        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          appointmentTranscript: transcript,
        }));

        // Call the summary endpoint
        const summaryResponse = await fetch(
          "http://localhost:3000/generate-summary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ transcript }),
          }
        );

        if (summaryResponse.ok) {
          const summaryData = await summaryResponse.json();
          setSummary(summaryData.summary);

          // Optionally update the summary in Firestore
          await updateDoc(doc(db, "appointment", id), {
            Summary: summaryData.summary,
          });
        } else {
          setMessage("Error generating summary.");
        }

        setMessage("Transcript and summary generated and saved.");
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
      <Heading as="h1" size="xl" mb={6} color="#00366d">
        Appointment Details
      </Heading>
      <Box
        p={6}
        bg="white"
        borderRadius="md"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
      >
        <Text>
          <strong>Patient Name:</strong> {patientName}
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
      <Divider my={6} />

      <Heading as="h1" size="xl" mb={6} color="#00366d">
        Appointment Transcript
      </Heading>
      <Box
        p={6}
        bg="gray.50"
        borderRadius="md"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
      >
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

      <Divider my={6} />

      <Heading as="h1" size="xl" mb={6} color="#00366d">
        Appointment Summary
      </Heading>
      <Box
        p={6}
        bg="gray.50"
        borderRadius="md"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
      >
        {summary ? (
          <Text whiteSpace="pre-wrap">{summary}</Text>
        ) : (
          <Text>No summary available for this appointment.</Text>
        )}
      </Box>

      {!appointment.appointmentTranscript && (
        <Box mt={6}>
          <Input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            display="none"
            id="audio-upload"
          />
          <Button
            as="label"
            htmlFor="audio-upload"
            mt={4}
            _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
            transition="all 0.3s"
            marginRight={3}
            color="#f1f8ff"
            bg="#335d8f"
          >
            Select Audio
          </Button>
          <Button
            onClick={handleUpload}
            mt={4}
            isLoading={uploading}
            _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
            transition="all 0.3s"
            color="#f1f8ff"
            bg="#335d8f"
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
