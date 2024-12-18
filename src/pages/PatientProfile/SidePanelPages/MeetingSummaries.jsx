import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Divider,
  UnorderedList,
  ListItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function MeetingSummaries() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const patientId = user.uid;
        const appointmentsRef = collection(db, "appointment");
        const q = query(appointmentsRef, where("patient_id", "==", patientId));
        const querySnapshot = await getDocs(q);
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      }
    }

    fetchAppointments();
  }, []);

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
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            color="#00366d"
            whiteSpace="normal"
            wordBreak="break-word"
          >
            Meeting Summaries
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            textAlign="center"
            color="#335d8f"
          >
            Here are the meeting notes from your doctors. Review your previous
            appointments, recommendations, and the next scheduled visits.
          </Text>
          <Divider />

          {appointments.map((appointment) => (
            <Box
              key={appointment.id}
              borderWidth="1px"
              borderRadius="md"
              padding="1.5rem"
              bg="#F9FAFB"
              boxShadow="sm"
            >
              <Flex align="center" flexWrap="wrap">
                <Heading
                  as="h2"
                  size="md"
                  color="#335d8f"
                  mb={2}
                  flex="1"
                  whiteSpace="normal"
                >
                  Appointment:{" "}
                  {new Date(
                    appointment.appointmentDate.seconds * 1000
                  ).toLocaleDateString()}
                </Heading>
                <Spacer />
                <Text fontWeight="bold">{appointment.doctorName}</Text>
              </Flex>
              <UnorderedList>
                <ListItem>
                  <strong>Summary:</strong>{" "}
                  {appointment.appointmentSummary || "No summary available."}
                </ListItem>
                {appointment.NextAppointmentDate && (
                  <ListItem fontWeight="bold">
                    Next Appointment: {appointment.NextAppointmentDate} at{" "}
                    {appointment.NextAppointmentTime}
                  </ListItem>
                )}
              </UnorderedList>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default MeetingSummaries;
