import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; //get current logged-in user

function RemindersAndAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [doctor, setDoctor] = useState({
    firstName: "Not Connected",
    lastName: "To A Doctor",
    profilePicture: null, // Default fallback image
  }); // Default doctor state

  useEffect(() => {
    const fetchPatient = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const db = getFirestore();
        const patientRef = collection(db, "patients");
        const patientQuery = query(
          patientRef,
          where("email", "==", user.email)
        );
        const patientSnapshot = await getDocs(patientQuery);

        if (!patientSnapshot.empty) {
          const patientDoc = patientSnapshot.docs[0];
          const patientData = patientDoc.data();
          setPatientId(patientData.id); // Set the logged-in user's patient ID

          // Fetch the doctor's data only if doctor_id exists
          if (patientData.doctor_id) {
            const doctorRef = collection(db, "doctor");
            const doctorQuery = query(
              doctorRef,
              where("id", "==", patientData.doctor_id)
            );
            const doctorSnapshot = await getDocs(doctorQuery);

            if (!doctorSnapshot.empty) {
              const doctorDoc = doctorSnapshot.docs[0];
              const doctorData = doctorDoc.data();
              setDoctor(doctorData); // Set doctor details in state
            } else {
              // Doctor not found
              console.warn("Doctor not found for the provided doctor_id.");
            }
          }
        }
      }
    };

    fetchPatient();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (patientId) {
        const db = getFirestore();
        const appointmentRef = collection(db, "appointment");
        const appointmentQuery = query(
          appointmentRef,
          where("patient_id", "==", patientId)
        );
        const appointmentSnapshot = await getDocs(appointmentQuery);

        const fetchedAppointments = appointmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Get current date at midnight for date comparison
        const currentDate = new Date();
        const today = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );

        // Filter upcoming appointments
        const upcoming = fetchedAppointments
          .filter((appointment) => {
            const appointmentDate = appointment.appointmentDate.toDate();
            return appointmentDate >= today;
          })
          .sort(
            (a, b) => a.appointmentDate.toDate() - b.appointmentDate.toDate()
          ); // Sort by date ascending

        // Filter past appointments
        const past = fetchedAppointments
          .filter((appointment) => {
            const appointmentDate = appointment.appointmentDate.toDate();
            return appointmentDate < today;
          })
          .sort(
            (a, b) => b.appointmentDate.toDate() - a.appointmentDate.toDate()
          ); // Sort by date descending

        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <ChakraProvider>
      <Box
        bgGradient="linear(to-br, blue.50, gray.50)"
        minHeight="100vh"
        padding={{ base: "1rem", md: "2rem", lg: "3rem" }}
        color="#333"
      >
        <VStack
          spacing={8}
          align="stretch"
          width={{ base: "95%", md: "90%", lg: "80%" }}
          maxWidth="1200px"
          mx="auto"
          bg="rgba(255, 255, 255, 0.6)"
          borderRadius="xl"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
        >
          <Heading as="h1" size="lg" textAlign="center" color="#00366d">
            Appointments
          </Heading>
          <Divider />

          {/* Reminders */}
          {/* <Box>
            <Heading as="h2" size="md" color="#00366d" mb={2}>
              Reminders
            </Heading>
            {doctor.firstName === "Not Connected" ? "Must be connected to a doctor first" : (
              <>
                <Text>- Take medication (Metformin) at 8:00 AM</Text>
                <Text>- Schedule follow-up with Dr. Smith</Text>
                <Text>- Submit lab results to the online portal</Text>
              </>
            )}
          </Box> */}

          <Divider />

          {/* Upcoming Appointments */}
          <Box>
            <Heading as="h2" size="md" color="#00366d" mb={2}>
              Upcoming Appointments
            </Heading>
            {doctor.firstName === "Not Connected" ? "Must be connected to a doctor first" : loading ? (
              <Text>Loading...</Text>
            ) : (
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Profile</Th>
                      <Th>Doctor</Th>
                      <Th>Date</Th>
                      <Th>Description</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {upcomingAppointments.map((appointment) => (
                      <Tr key={appointment.id}>
                        <Td>
                          <Avatar
                            size="lg"
                            src={doctor.profilePicture || undefined} // Use fallback if null
                            name={`${doctor.firstName} ${doctor.lastName}`}
                          />
                        </Td>
                        <Td>{`${doctor.firstName} ${doctor.lastName}`}</Td>
                        <Td>
                          {new Date(
                            appointment.appointmentDate.seconds * 1000
                          ).toLocaleString()}
                        </Td>
                        <Td>{appointment.appointmentDescription}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>

          <Divider />

          {/* Past Appointments */}
          <Box>
            <Heading as="h2" size="md" color="#00366d" mb={2}>
              Past Appointments
            </Heading>
            {doctor.firstName === "Not Connected" ? "Must be connected to a doctor first" : loading ? (
              <Text>Loading...</Text>
            ) : (
              <TableContainer>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Profile</Th>
                      <Th>Doctor</Th>
                      <Th>Date</Th>
                      <Th>Description</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pastAppointments.map((appointment) => (
                      <Tr key={appointment.id}>
                        <Td>
                          <Avatar
                            size="lg"
                            src={doctor.profilePicture || undefined} // Use fallback if null
                            name={`${doctor.firstName} ${doctor.lastName}`}
                          />
                        </Td>
                        <Td>{`${doctor.firstName} ${doctor.lastName}`}</Td>
                        <Td>
                          {new Date(
                            appointment.appointmentDate.seconds * 1000
                          ).toLocaleString()}
                        </Td>
                        <Td>{appointment.appointmentDescription}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default RemindersAndAppointments;