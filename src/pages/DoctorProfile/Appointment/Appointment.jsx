import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Button, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Firebase initialization (make sure to import your Firebase config)
const db = getFirestore();

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchAppointments() {
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

          const patientIds = patientSnapshot.docs.map((doc) => ({
            id: doc.data().id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
          }));

          // Step 3: Get appointments for each patient and display their first and last name
          const appointmentPromises = patientIds.map(async (patient) => {
            const appointmentQuery = query(
              collection(db, "appointment"),
              where("patient_id", "==", patient.id)
            );
            const appointmentSnapshot = await getDocs(appointmentQuery);

            return appointmentSnapshot.docs.map((doc) => ({
              id: doc.id,
              date: doc.data().appointmentDate,
              description: doc.data().appointmentDescription,
              patientName: `${patient.firstName} ${patient.lastName}`,
            }));
          });

          const fetchedAppointments = (
            await Promise.all(appointmentPromises)
          ).flat();
          setAppointments(fetchedAppointments);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

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
        Appointments
      </Heading>
      {appointments.length > 0 ? (
        <VStack spacing={6} align="stretch">
          {appointments.map((appointment) => (
            <Box
              key={appointment.id}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
            >
              <Heading as="h2" size="md" mb={2}>
                {appointment.patientName}
              </Heading>
              <Text>
                Date:{" "}
                {new Date(appointment.date.seconds * 1000).toLocaleDateString()}
              </Text>
              <Text>
                Time:{" "}
                {new Date(appointment.date.seconds * 1000).toLocaleTimeString()}
              </Text>
              <Text>Description: {appointment.description}</Text>
              <Button colorScheme="teal" mt={4}>
                View Details
              </Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No appointments scheduled.</Text>
      )}
      <Box display="flex" justifyContent="center" mt={8} mb={6}>
        <Link to="/doctor-profile/appointments/create-appointment">
          <Button colorScheme="teal" display="flex" alignItems="center" gap="4">
            New Appointment
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Appointments;
