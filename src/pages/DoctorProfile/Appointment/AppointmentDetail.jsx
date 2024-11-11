import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Spinner,
  Divider,
  Icon,
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
import { FaMicrophone, FaStop } from "react-icons/fa"; // Import icons

const db = getFirestore();

function AppointmentDetail() {
  const { id } = useParams(); // Get appointment ID from URL params
  const [appointment, setAppointment] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [audioFile, setAudioFile] = useState(null); // Audio upload
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Voice recording state
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0); // Recording time in seconds
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null); // Reference to the timer interval

  useEffect(() => {
    async function fetchAppointment() {
      try {
        // Fetch appointment details using ID
        const appointmentDoc = await getDoc(doc(db, "appointment", id));
        if (appointmentDoc.exists()) {
          const appointmentData = appointmentDoc.data();
          setAppointment(appointmentData);

          // Fetch patient details using the patient_id in the appointment
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

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [id]);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setMessage("Please select or record an audio file first.");
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

        // Update appointment with the transcript in Firestore
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

  // Voice recording functions
  const startRecording = async () => {
    setMessage("");
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setMessage("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const file = new File([audioBlob], "recording.webm", {
          type: "audio/webm",
        });
        setAudioFile(file);
        setMessage("Recording completed. Ready to upload.");
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setRecordingTime(0);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setMessage("Error accessing microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
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

      {/* Transcript Section */}
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

      {/* Render buttons depending on if there's a transcript or not */}
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
            isDisabled={recording || uploading}
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
            marginRight={3}
            isDisabled={recording}
          >
            Upload and Transcribe
          </Button>
          {/* Voice Recording Buttons */}
          <Button
            onClick={recording ? stopRecording : startRecording}
            mt={4}
            _hover={{ bg: recording ? "#c53030" : "#4d7098", boxShadow: "2xl" }}
            transition="all 0.3s"
            color="#f1f8ff"
            bg={recording ? "#e53e3e" : "#335d8f"} // Change color when recording
            leftIcon={<Icon as={recording ? FaStop : FaMicrophone} />} // Change icon
            isDisabled={uploading}
          >
            {recording ? "Stop Recording" : "Start Recording"}
          </Button>
          {/* Recording Indicator */}
          {recording && (
            <Box mt={4} display="flex" alignItems="center">
              <Box
                as="span"
                h="12px"
                w="12px"
                borderRadius="50%"
                bg="red.500"
                mr={2}
                className="blink" // CSS class for blinking effect
              />
              <Text color="red.500" fontWeight="bold" mr={2}>
                Recording in progress...
              </Text>
              <Text color="red.500">
                Recording Time: {recordingTime} seconds
              </Text>
            </Box>
          )}
        </Box>
      )}
      {message && <Box mt={4}>{message}</Box>}
      {/* Add CSS for blinking effect */}
      <style>
        {`
          .blink {
            animation: blinker 1s linear infinite;
          }
          @keyframes blinker {
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
}

export default AppointmentDetail;
