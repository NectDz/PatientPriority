
import React, { useState, useEffect } from 'react';
import {
    ChakraProvider,
    Box,
    VStack,
    Heading,
    Text,
    Divider,
    Input,
    Button,
    Icon,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Spinner,
} from "@chakra-ui/react";
import { FaRobot, FaUser } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function AIChatbot() {
    const [question, setQuestion] = useState("");
    const [responses, setResponses] = useState([]);
    const [conversationContext, setConversationContext] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);
    const [patientData, setPatientData] = useState(null);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [meetingSummaries, setMeetingSummaries] = useState([]);
    const [fetchingPatient, setFetchingPatient] = useState(true);

    useEffect(() => {
        const fetchPatientData = async () => {
            const auth = getAuth();
            const db = getFirestore();

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const patientsRef = collection(db, "patients");
                        const q = query(patientsRef, where("email", "==", user.email));
                        const querySnapshot = await getDocs(q);

                        if (!querySnapshot.empty) {
                            const patientDoc = querySnapshot.docs[0];
                            const patient = { id: patientDoc.id, ...patientDoc.data() };
                            setPatientData(patient);
                            await fetchAppointments(patient.id);
                            await fetchMeetingSummaries(patient.id);
                        } else {
                            console.error("No patient data found");
                        }
                    } catch (error) {
                        console.error("Error fetching patient data:", error);
                    }
                }
                setFetchingPatient(false);
            });
        };

        const fetchAppointments = async (patientId) => {
            try {
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

                const currentDate = new Date();
                const today = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                );

                const upcoming = fetchedAppointments.filter((appointment) => {
                    const appointmentDate = appointment.appointmentDate.toDate();
                    return appointmentDate >= today;
                });

                const past = fetchedAppointments.filter((appointment) => {
                    const appointmentDate = appointment.appointmentDate.toDate();
                    return appointmentDate < today;
                });

                setUpcomingAppointments(upcoming);
                setPastAppointments(past);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        const fetchMeetingSummaries = async (patientId) => {
            try {
                const db = getFirestore();
                const appointmentRef = collection(db, "appointment");
                const summaryQuery = query(
                    appointmentRef,
                    where("patient_id", "==", patientId)
                );
                const summarySnapshot = await getDocs(summaryQuery);

                const summaries = summarySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    date: new Date(doc.data().appointmentDate.seconds * 1000).toLocaleDateString(),
                    doctorName: doc.data().doctorName || "Unknown",
                    summary: doc.data().appointmentSummary || "No summary available.",
                    nextAppointment: doc.data().NextAppointmentDate
                        ? `${doc.data().NextAppointmentDate} at ${doc.data().NextAppointmentTime}`
                        : "None scheduled",
                }));

                setMeetingSummaries(summaries);
            } catch (error) {
                console.error("Error fetching meeting summaries:", error);
            }
        };

        fetchPatientData();
    }, []);

    const handleSubmit = async () => {
        if (!question.trim()) return;

        setLoading(true);
        const newResponses = [...responses, { question, response: "Thinking..." }];
        setResponses(newResponses);

        try {
            const finalResponse = await generateFinalResponse(
                question,
                conversationContext,
                patientData,
                upcomingAppointments,
                pastAppointments,
                meetingSummaries
            );

            setConversationContext((prevContext) => [
                ...prevContext,
                { user: question, bot: finalResponse },
            ]);

            newResponses[newResponses.length - 1].response = finalResponse;
            setResponses(newResponses);
            setQuestion("");
        } catch (error) {
            console.error("Error:", error);

            newResponses[newResponses.length - 1].response =
                "Sorry, I couldn't process your question. Please try again.";
            setResponses(newResponses);
        } finally {
            setLoading(false);
        }
    };

    const generateFinalResponse = async (question, context, patient, upcoming, past, summaries) => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyConKBu9nojKO-DzqtK-dKI5X57RiVIRUQ");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const recentContext = context.slice(-5);
            const contextString = recentContext
                .map((exchange, index) => `Turn ${index + 1}: User: ${exchange.user}\nBot: ${exchange.bot}`)
                .join("\n\n");

            const medicationsContext = patient?.medications
                ? Object.entries(patient.medications).map(
                      ([key, med]) => `${med.name} (${med.dosage}, ${med.frequency})`
                  ).join(", ")
                : "None reported";

            const appointmentsContext = `
                Upcoming Appointments:
                ${upcoming
                    .map(
                        (appt) =>
                            `- ${new Date(
                                appt.appointmentDate.seconds * 1000
                            ).toLocaleString()}: ${appt.appointmentDescription}`
                    )
                    .join("\n") || "None"}
                
                Past Appointments:
                ${past
                    .map(
                        (appt) =>
                            `- ${new Date(
                                appt.appointmentDate.seconds * 1000
                            ).toLocaleString()}: ${appt.appointmentDescription}`
                    )
                    .join("\n") || "None"}
            `;

            const meetingSummariesContext = `
                Meeting Summaries:
                ${summaries
                    .map(
                        (summary) =>
                            `- Date: ${summary.date}, Doctor: ${summary.doctorName}\n  Summary: ${
                                summary.summary
                            }\n  Next Appointment: ${summary.nextAppointment}`
                    )
                    .join("\n\n") || "No meeting summaries available."}
            `;

            const patientContext = patient
                ? `
                Patient Information:
                Name: ${patient.firstName} ${patient.lastName}
                Age: ${patient.age}
                Gender: ${patient.gender}
                Diet: ${patient.diet || "Not provided"}
                Physical Activity: ${patient.physicalActivity || "Not provided"}
                Lifestyle: ${patient.lifestyle || "Not provided"}
                Alcohol Consumption: ${patient.alcoholConsumption || "Not provided"}
                Conditions: ${patient.conditions || "None reported"}
                Allergies: ${patient.allergies || "None reported"}
                Medications: ${medicationsContext}
                `
                : "No patient information available.";

            const prompt = `
            The following is a conversation history between a user and CareBuddy:
            ${contextString}

            Patient context:
            ${patientContext}

            Appointments context:
            ${appointmentsContext}

            Meeting summaries context:
            ${meetingSummariesContext}

            Now, the user asks: "${question}"
            Provide a simple, short, and clear response.
            `;

            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("API Error:", error);
            throw new Error("Failed to generate response. Please try again later.");
        }
    };

    return (
        <ChakraProvider>
            {/* Disclaimer Modal */}
            <Modal isOpen={isDisclaimerOpen} onClose={() => {}} isCentered>
                <ModalOverlay />
                <ModalContent
                    p={8}
                    bg="#f1f8ff"
                    color="white"
                    borderRadius="md"
                    boxShadow="2xl"
                    maxWidth="90vw"
                    maxHeight="90vh"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    transform="scale(1)"
                    transition="transform 0.3s ease"
                    _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)"
                    }}
                >
                    <ModalHeader textAlign="center" fontSize="4xl" fontWeight="bold" color="#00366d">
                        Important Notice
                    </ModalHeader>
                    <ModalBody textAlign="center" fontSize="2xl" color="#00366d">
                        <Text mb={6}>
                            CareBuddy is a beta feature designed to provide general health information.
                            Responses are AI-generated and should not be considered as medical advice. 
                            Please consult a healthcare professional for personalized guidance.
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" color="red.300">
                            Always verify information with your doctor.
                        </Text>
                    </ModalBody>
                    <ModalFooter display="flex" justifyContent="center">
                        <Button
                            bg="#003366"
                            color="white"
                            _hover={{
                                bg: "#002244",
                                transform: "scale(1.1)",
                                boxShadow: "0px 4px 15px rgba(0, 123, 255, 0.6)"
                            }}
                            size="lg"
                            onClick={() => setIsDisclaimerOpen(false)}
                            px={10} py={6}
                            fontSize="2xl"
                        >
                            I Understand
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box
                bgGradient="linear(to-br, blue.50, gray.50)"
                minHeight="100vh"
                padding={{ base: "1rem", md: "2rem", lg: "3rem" }}
                color="#333"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                {/* Introduction Section */}
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
                    mb={4}
                >
                    <Heading as="h1" size="lg" textAlign="center" color="#00366d">
                        Meet CareBuddy
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} textAlign="center" color="#335d8f">
                        CareBuddy is your friendly AI-powered assistant here to help with your healthcare-related
                        questions. Type your question below and get helpful, personalized responses.
                    </Text>
                </VStack>

                {/* Chat Display */}
                {responses.length > 0 && (
                    <VStack
                        spacing={4}
                        align="stretch"
                        width={{ base: "95%", md: "90%", lg: "80%" }}
                        maxWidth="1200px"
                        mx="auto"
                        bg="rgba(255, 255, 255, 0.6)"
                        borderRadius="xl"
                        //padding="1.5rem"
                        overflowY="auto"
                        maxHeight="70vh"
                        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
                    >
                        {responses.map((item, index) => (
                            <Box key={index} style={styles.responseContainer}>
                                <Box style={styles.section}>
                                    <Flex align="center" mb={2}>
                                        <Icon as={FaUser} color="teal.600" mr={2} />
                                        <Text style={styles.sectionTitle}>You asked:</Text>
                                    </Flex>
                                    <Text fontSize="lg">{item.question}</Text>
                                </Box>
                                <Divider />
                                <Box style={styles.section}>
                                    <Flex align="center" mb={2}>
                                        <Icon as={FaRobot} color="purple.700" mr={2} />
                                        <Text style={styles.sectionTitle}>CareBuddy:</Text>
                                    </Flex>
                                    <Text fontSize="lg">{item.response}</Text>
                                </Box>
                            </Box>
                        ))}
                    </VStack>
                )}

                {/* User Input at the Bottom */}
                <Box
                    as="form"
                    onSubmit={(e) => e.preventDefault()}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={{ base: "95%", md: "90%", lg: "80%" }}
                    maxWidth="1200px"
                    mx="auto"
                    mt={4}
                    //padding="1.5rem"
                    //bg="rgba(255, 255, 255, 0.8)"
                    //borderRadius="md"
                    //boxShadow="0px 2px 8px rgba(0, 0, 0, 0.2)"
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
          bg="rgba(255, 255, 255, 0.6)"
                        borderRadius="xl"
                >
                    <Input
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        bg="#F9FAFB"
                        borderRadius="md"
                        size="md"
                        width="100%"
                        maxWidth="700px"
                        mr={4}
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                    <Button
                        //bg="#003366"
                        //color="white"
                        //_hover={{ bg: "#002244" }}
                        fontSize="md"
                        paddingX="2rem"
                        paddingY="1.5rem"
                        borderRadius="md"
                        onClick={handleSubmit}
                        isLoading={loading}
                        _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"

                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

const styles = {
    responseContainer: {
        backgroundColor: '#f9f9fb',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    section: {
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#0b2545',
        marginBottom: '0.5rem',
    },
};

export default AIChatbot;