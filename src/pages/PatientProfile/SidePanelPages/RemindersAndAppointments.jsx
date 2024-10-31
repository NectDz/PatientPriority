// import will go up here
import { ChakraProvider, Box, VStack, Heading, Text, Divider } from "@chakra-ui/react";

function RemindersAndAppointments() {
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
