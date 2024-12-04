import { ChakraProvider, Box, VStack, Heading, Text, Divider, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";  // To get the current logged-in user

function RemindersAndAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientId, setPatientId] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            const user = getAuth().currentUser;
            if (user) {
                const db = getFirestore();
                const patientRef = collection(db, "patients");
                const patientQuery = query(patientRef, where("email", "==", user.email));
                const patientSnapshot = await getDocs(patientQuery);

                if (!patientSnapshot.empty) {
                    const patientDoc = patientSnapshot.docs[0];
                    const patientData = patientDoc.data();
                    console.log('Patient found:', patientData); // Log patient data
                    setPatientId(patientData.id);  // Set the logged-in user's patient ID
                }
            }
        };

        fetchPatient();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (patientId) {
                console.log('Fetching appointments for patient:', patientId);  // Check if patientId is correct
                const db = getFirestore();
                const appointmentRef = collection(db, "appointment");
                const appointmentQuery = query(appointmentRef, where("patient_id", "==", patientId));
                const appointmentSnapshot = await getDocs(appointmentQuery);
    
                if (appointmentSnapshot.empty) {
                    console.log('No appointments found for this patient');
                }
    
                const fetchedAppointments = appointmentSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
    
                console.log('Fetched appointments:', fetchedAppointments);  // Check if appointments are fetched correctly
                setAppointments(fetchedAppointments);
                setLoading(false);
            }
        };
    
        fetchAppointments();
    }, [patientId]);  // Trigger fetching when patientId is set
    

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
                        Reminders and Appointments
                    </Heading>
                    <Divider />

                    {/* Reminders */}
                    <Box>
                        <Heading as="h2" size="md" color="#00366d" mb={2}>
                            Reminders
                        </Heading>
                        <Text>- Take medication (Metformin) at 8:00 AM</Text>
                        <Text>- Schedule follow-up with Dr. Smith</Text>
                        <Text>- Submit lab results to the online portal</Text>
                    </Box>

                    <Divider />

                    {/* Upcoming Appointments */}
                    <Box>
                        <Heading as="h2" size="md" color="#00366d" mb={2}>
                            Upcoming Appointments
                        </Heading>
                        {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <TableContainer>
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>
                                            <Th>Profile</Th>
                                            <Th>Patient</Th>
                                            <Th>Date</Th>
                                            <Th>Description</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {appointments.map((appointment) => (
                                            <Tr key={appointment.id}>
                                                <Td>
                                                    <Avatar
                                                        size="lg"
                                                        src={
                                                            appointment.profilePicture || "default-profile.png"
                                                        }
                                                        name={`${appointment.firstName} ${appointment.lastName}`}
                                                    />
                                                </Td>
                                                <Td>{`${appointment.firstName} ${appointment.lastName}`}</Td>
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
                        {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <TableContainer>
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>
                                            <Th>Profile</Th>
                                            <Th>Patient</Th>
                                            <Th>Date</Th>
                                            <Th>Description</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {appointments
                                            .filter(
                                                (appointment) =>
                                                    new Date(
                                                        appointment.appointmentDate.seconds * 1000
                                                    ) < new Date()
                                            )
                                            .map((appointment) => (
                                                <Tr key={appointment.id}>
                                                    <Td>
                                                        <Avatar
                                                            size="lg"
                                                            src={
                                                                appointment.profilePicture || "default-profile.png"
                                                            }
                                                            name={`${appointment.firstName} ${appointment.lastName}`}
                                                        />
                                                    </Td>
                                                    <Td>{`${appointment.firstName} ${appointment.lastName}`}</Td>
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