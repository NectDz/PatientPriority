// import will go up here
import { ChakraProvider, Box, VStack, Heading, Text, Divider, HStack } from "@chakra-ui/react";

function Overview() {
    return (
        <ChakraProvider>
            <Box bg="#F4F4F9" minHeight="100vh" padding="2rem" color="#333" display="flex" justifyContent="center" alignItems="center">
                <VStack
                    spacing={8}
                    align="stretch"
                    width="80%"
                    maxWidth="1200px"
                    boxShadow="lg"
                    bg="white"
                    borderRadius="md"
                    padding="2rem"
                >
                    <Heading as="h1" size="lg" textAlign="center" color="#0B2545">
                        Patient Overview
                    </Heading>
                    <Divider />

                    {/* Patient Information */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Patient Information
                        </Heading>
                        <Text><strong>Name:</strong> John Doe</Text>
                        <Text><strong>Age:</strong> 45</Text>
                        <Text><strong>Gender:</strong> Male</Text>
                        <Text><strong>Contact:</strong> +1 (123) 456-7890</Text>
                        <Text><strong>Email:</strong> johndoe@example.com</Text>
                    </Box>

                    <Divider />

                    {/* Medical History */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Medical History
                        </Heading>
                        <Text>- Hypertension</Text>
                        <Text>- Type 2 Diabetes</Text>
                        <Text>- High Cholesterol</Text>
                    </Box>

                    <Divider />

                    {/* Current Medications */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Current Medications
                        </Heading>
                        <HStack spacing={4}>
                            <Box>
                                <Text><strong>Medication:</strong> Metformin</Text>
                                <Text><strong>Dosage:</strong> 500mg</Text>
                                <Text><strong>Frequency:</strong> Twice a day</Text>
                            </Box>
                            <Box>
                                <Text><strong>Medication:</strong> Lisinopril</Text>
                                <Text><strong>Dosage:</strong> 20mg</Text>
                                <Text><strong>Frequency:</strong> Once a day</Text>
                            </Box>
                        </HStack>
                    </Box>

                    <Divider />

                    {/* Upcoming Appointments */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Upcoming Appointments
                        </Heading>
                        <Text>- Cardiology Check-up: November 15, 2024 at 10:00 AM</Text>
                        <Text>- Annual Physical: December 20, 2024 at 9:30 AM</Text>
                    </Box>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default Overview;

