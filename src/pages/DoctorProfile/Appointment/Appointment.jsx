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
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPagePast, setCurrentPagePast] = useState(1);
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

          const patientIds = patientSnapshot.docs
            .filter((doc) => doc.data().id) // filter out patients without an ID
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

          // Sort appointments by date in descending order (reverse chronological)
          fetchedAppointments.sort((a, b) => b.date.seconds - a.date.seconds);

          // Filter upcoming and past appointments
          const currentDate = new Date();
          const today = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          );

          const upcoming = fetchedAppointments.filter((appointment) => {
            const appointmentDate = appointment.date.toDate();
            return appointmentDate >= today;
          });

          const past = fetchedAppointments.filter((appointment) => {
            const appointmentDate = appointment.date.toDate();
            return appointmentDate < today;
          });

          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

  // Pagination logic for upcoming appointments
  const indexOfLastUpcomingAppointment = currentPageUpcoming * appointmentsPerPage;
  const indexOfFirstUpcomingAppointment = indexOfLastUpcomingAppointment - appointmentsPerPage;
  const currentUpcomingAppointments = upcomingAppointments.slice(
    indexOfFirstUpcomingAppointment,
    indexOfLastUpcomingAppointment
  );

  const totalUpcomingPages = Math.ceil(upcomingAppointments.length / appointmentsPerPage);

  const nextPageUpcoming = () => {
    if (currentPageUpcoming < totalUpcomingPages) {
      setCurrentPageUpcoming(currentPageUpcoming + 1);
    }
  };

  const prevPageUpcoming = () => {
    if (currentPageUpcoming > 1) {
      setCurrentPageUpcoming(currentPageUpcoming - 1);
    }
  };

  // Pagination logic for past appointments
  const indexOfLastPastAppointment = currentPagePast * appointmentsPerPage;
  const indexOfFirstPastAppointment = indexOfLastPastAppointment - appointmentsPerPage;
  const currentPastAppointments = pastAppointments.slice(
    indexOfFirstPastAppointment,
    indexOfLastPastAppointment
  );

  const totalPastPages = Math.ceil(pastAppointments.length / appointmentsPerPage);

  const nextPagePast = () => {
    if (currentPagePast < totalPastPages) {
      setCurrentPagePast(currentPagePast + 1);
    }
  };

  const prevPagePast = () => {
    if (currentPagePast > 1) {
      setCurrentPagePast(currentPagePast - 1);
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

      {/* Upcoming Appointments */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Upcoming Appointments
        </Heading>
        {currentUpcomingAppointments.length > 0 ? (
          <VStack spacing={6} align="stretch">
            {currentUpcomingAppointments.map((appointment) => (
              <Box
                key={appointment.id}
                p={6}
                bg="white"
                borderRadius="md"
                boxShadow="md"
              >
                <Heading as="h3" size="md" mb={2}>
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
          <Text>No upcoming appointments.</Text>
        )}

        {/* Pagination Controls for Upcoming */}
        {upcomingAppointments.length > appointmentsPerPage && (
          <HStack mt={6} justify="center">
            <Button onClick={prevPageUpcoming} disabled={currentPageUpcoming === 1}>
              Previous
            </Button>
            <Text>
              Page {currentPageUpcoming} of {totalUpcomingPages}
            </Text>
            <Button onClick={nextPageUpcoming} disabled={currentPageUpcoming === totalUpcomingPages}>
              Next
            </Button>
          </HStack>
        )}
      </Box>

      {/* Past Appointments */}
      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Past Appointments
        </Heading>
        {currentPastAppointments.length > 0 ? (
          <VStack spacing={6} align="stretch">
            {currentPastAppointments.map((appointment) => (
              <Box
                key={appointment.id}
                p={6}
                bg="white"
                borderRadius="md"
                boxShadow="md"
              >
                <Heading as="h3" size="md" mb={2}>
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
          <Text>No past appointments.</Text>
        )}

        {/* Pagination Controls for Past */}
        {pastAppointments.length > appointmentsPerPage && (
          <HStack mt={6} justify="center">
            <Button onClick={prevPagePast} disabled={currentPagePast === 1}>
              Previous
            </Button>
            <Text>
              Page {currentPagePast} of {totalPastPages}
            </Text>
            <Button onClick={nextPagePast} disabled={currentPagePast === totalPastPages}>
              Next
            </Button>
          </HStack>
        )}
      </Box>
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