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
} from "firebase/firestore";

const db = getFirestore();

function AppointmentDetail() {
  const { id } = useParams(); //get appointment ID from URL params
  const [appointment, setAppointment] = useState(null);
  const [patientName, setPatientName] = useState(""); 
  const [audioFile, setAudioFile] = useState(null); //audio upload
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchAppointment() {
      try {
        //fetch appointment details using ID
        const appointmentDoc = await getDoc(doc(db, "appointment", id));
        if (appointmentDoc.exists()) {
          const appointmentData = appointmentDoc.data();
          setAppointment(appointmentData);

          //fetch patient details using the patient_id in the appointment
          const patientsQuery = query(
            collection(db, "patients"),
            where("id", "==", appointmentData.patient_id) //match appointment's patient_id to patient's id field
          );

          const patientsSnapshot = await getDocs(patientsQuery);
          if (!patientsSnapshot.empty) {
            const patientData = patientsSnapshot.docs[0].data(); //get first matching patient document
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

        //update appointment with the transcript in Firestore
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
      <Divider my={6} />{" "}
      
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
      {/*render buttons depending on if there's a transcript or not */}
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
