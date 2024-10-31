// import will go up here
import { ChakraProvider, Box, VStack, Heading, Text, Divider } from "@chakra-ui/react";

function RemindersAndAppointments() {
    return (
        <ChakraProvider>
            <Box bg="#EFF8F8" minHeight="100vh" padding="2rem" color="#00366d" display="flex" justifyContent="center" alignItems="center">
            <VStack
                    spacing={8}
                    align="stretch"
                    width="80%"
                    maxWidth="1200px"
                    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
                    bg="rgba(255, 255, 255, 0.6)"
                    borderRadius="md"
                    padding="2rem"
                >
                    <Heading as="h1" size="lg" textAlign="center" color="#256c69">
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
                        <Text>- Dental Check-up: October 30, 2024 at 2:00 PM</Text>
                        <Text>- Physical Therapy: November 5, 2024 at 11:00 AM</Text>
                        <Text>- Cardiologist Visit: November 20, 2024 at 10:00 AM</Text>
                    </Box>

                    <Divider />

                    {/* Past Appointments */}
                    <Box>
                        <Heading as="h2" size="md" color="#00366d" mb={2}>
                            Past Appointments
                        </Heading>
                        <Text>- Annual Physical: October 10, 2024</Text>
                        <Text>- Eye Exam: September 15, 2024</Text>
                        <Text>- Dermatology Consultation: August 28, 2024</Text>
                    </Box>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default RemindersAndAppointments;
