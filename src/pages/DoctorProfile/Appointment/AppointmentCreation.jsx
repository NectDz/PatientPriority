import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase initialization (make sure Firebase is initialized properly)
const db = getFirestore();

function AppointmentCreation() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchPatients() {
      try {
        if (!user) {
          return;
        }

        const doctorEmail = user.email;

        // Step 1: Get the doctor's ID by matching the email in the "doctor" collection
        const doctorQuery = query(
          collection(db, "doctor"),
          where("email", "==", doctorEmail)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorData = doctorSnapshot.docs[0].data();
          const doctorId = doctorData.id;

          // Step 2: Get patients associated with this doctor
          const patientQuery = query(
            collection(db, "patients"),
            where("doctor_id", "==", doctorId)
          );
          const patientSnapshot = await getDocs(patientQuery);

          const patientList = patientSnapshot.docs.map((doc) => ({
            value: doc.data().id, // Use patient_id as value
            label: `${doc.data().firstName} ${doc.data().lastName}`, // Combine first and last name
          }));

          setPatients(patientList);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
      }
    }

    fetchPatients();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!selectedPatient || !date || !time || !description) {
      alert("Please fill out all fields");
      return;
    }

    try {
      // Get doctor ID again for this session
      const doctorQuery = query(
        collection(db, "doctor"),
        where("email", "==", user.email)
      );
      const doctorSnapshot = await getDocs(doctorQuery);

      if (!doctorSnapshot.empty) {
        const doctorData = doctorSnapshot.docs[0].data();
        const doctorId = doctorData.id;

        // Create the new appointment object
        const newAppointment = {
          appointmentDate: new Date(`${date}T${time}:00`), // Combines date and time into a single Date object
          appointmentDescription: description,
          appointmentTranscript: "", // Leave transcript blank
          doctor_id: doctorId,
          patient_id: selectedPatient.value,
        };

        // Step 3: Save the new appointment to Firestore in the "appointment" collection
        await addDoc(collection(db, "appointment"), newAppointment);

        console.log("New Appointment:", newAppointment);

        // After creating the appointment, navigate back to the appointments page
        navigate("/doctor-profile/appointments");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
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
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Create New Appointment
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="patient" mb={4}>
          <FormLabel>Select Patient</FormLabel>
          <Select
            value={selectedPatient}
            onChange={setSelectedPatient}
            options={patients}
            placeholder="Select a patient"
          />
        </FormControl>

        <FormControl id="date" mb={4}>
          <FormLabel>Appointment Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select appointment date"
          />
        </FormControl>

        <FormControl id="time" mb={4}>
          <FormLabel>Appointment Time</FormLabel>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Select appointment time"
          />
        </FormControl>

        <FormControl id="description" mb={4}>
          <FormLabel>Appointment Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter appointment details"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Create Appointment
        </Button>
      </form>
    </Box>
  );
}

export default AppointmentCreation;
