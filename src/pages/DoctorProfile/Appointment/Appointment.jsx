import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

//firebase init
const db = getFirestore();

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 3; //number of appointments per page

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchAppointments() {
      try {
        if (!user) {
          return;
        }

        const doctorEmail = user.email;

        //1 - get the doctor's ID by matching the email in the "doctor" collection
        const doctorQuery = query(
          collection(db, "doctor"),
          where("email", "==", doctorEmail)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorData = doctorSnapshot.docs[0].data();
          const doctorId = doctorData.id;

          //2 - get patients associated with this doctor
          const patientQuery = query(
            collection(db, "patients"),
            where("doctor_id", "==", doctorId)
          );
          const patientSnapshot = await getDocs(patientQuery);

          // const patientIds = patientSnapshot.docs.map((doc) => ({
          //   id: doc.data().id,
          //   firstName: doc.data().firstName,
          //   lastName: doc.data().lastName,
          // }));
          const patientIds = patientSnapshot.docs
          // filter out the patients with an ID (because new patients don't have an ID which causes an error)
            .filter((doc) => doc.data().id)
            .map((doc) => ({
              id: doc.data().id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
            }));

          //3 - get appointments for each patient and display their first and last name
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

          // Sort appointments chronologically by appointment date
          fetchedAppointments.sort((a, b) => a.date.seconds - b.date.seconds);

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

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
        Appointments
      </Heading>
      {currentAppointments.length > 0 ? (
        <VStack spacing={6} align="stretch">
          {currentAppointments.map((appointment) => (
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
              <Button
                as={Link}
                to={`/doctor-profile/appointments/${appointment.id}`}
                // colorScheme="teal"
                mt={4}
                boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
                _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
                transition="all 0.3s"
                color="#f1f8ff"
                bg="#335d8f"
              >
                View Details
              </Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No appointments scheduled.</Text>
      )}

      {/* Pagination Controls */}
      {appointments.length > appointmentsPerPage && (
        <HStack mt={6} justify="center">
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </HStack>
      )}

      <Box display="flex" justifyContent="center" mt={8} mb={6}>
        <Link to="/doctor-profile/appointments/create-appointment">
          <Button
            display="flex"
            alignItems="center"
            gap="4"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
            _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
            transition="all 0.3s"
            color="#f1f8ff"
            bg="#335d8f"
          >
            New Appointment
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Appointments;