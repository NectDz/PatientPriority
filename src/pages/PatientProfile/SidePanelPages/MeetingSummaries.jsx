import { ChakraProvider, Box, VStack, Heading, Text, Divider, UnorderedList, ListItem, Flex, Spacer } from "@chakra-ui/react";

function MeetingSummaries() {
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
                    <Heading as="h1" size="lg" textAlign="center" color="#00366d" whiteSpace="normal" wordBreak="break-word">
                        Meeting Summaries
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} textAlign="center" color="#335d8f">
                        Here are the meeting notes from your doctors. Review your previous appointments, recommendations, and the next scheduled visits.
                    </Text>
                    <Divider />

                    {/* Appointment Summary 1 */}
                    <Box borderWidth="1px" borderRadius="md" padding="1.5rem" bg="#F9FAFB" boxShadow="sm">
                        <Flex align="center" flexWrap="wrap">
                            <Heading as="h2" size="md" color="#335d8f" mb={2} flex="1" whiteSpace="normal">
                                Appointment: October 1, 2024
                            </Heading>
                            <Spacer />
                            <Text fontWeight="bold">Dr. Smith (PCP)</Text>
                        </Flex>
                        <UnorderedList>
                            <ListItem>Reviewed recent lab results, indicating stable blood glucose levels.</ListItem>
                            <ListItem>Adjusted dosage for blood pressure medication.</ListItem>
                            <ListItem>Discussed ongoing joint pain; recommended physical therapy.</ListItem>
                            <ListItem>Advised on maintaining a balanced diet and regular exercise.</ListItem>
                            <ListItem fontWeight="bold">Next Appointment: November 1, 2024</ListItem>
                        </UnorderedList>
                    </Box>

                    <Divider />

                    {/* Appointment Summary 2 */}
                    <Box borderWidth="1px" borderRadius="md" padding="1.5rem" bg="#F9FAFB" boxShadow="sm">
                        <Flex align="center" flexWrap="wrap">
                            <Heading as="h2" size="md" color="#335d8f" mb={2} flex="1" whiteSpace="normal">
                                Appointment: September 20, 2024
                            </Heading>
                            <Spacer />
                            <Text fontWeight="bold">Dr. Lee (Cardiologist)</Text>
                        </Flex>
                        <UnorderedList>
                            <ListItem>Checked progress on new diabetes management plan.</ListItem>
                            <ListItem>Prescribed new medication for cholesterol control.</ListItem>
                            <ListItem>Discussed symptoms of occasional dizziness; ordered further tests.</ListItem>
                            <ListItem>Provided tips on managing stress and improving sleep quality.</ListItem>
                            <ListItem fontWeight="bold">Next Appointment: October 20, 2024</ListItem>
                        </UnorderedList>
                    </Box>

                    <Divider />

                    {/* Appointment Summary 3 */}
                    <Box borderWidth="1px" borderRadius="md" padding="1.5rem" bg="#F9FAFB" boxShadow="sm">
                        <Flex align="center" flexWrap="wrap">
                            <Heading as="h2" size="md" color="#335d8f" mb={2} flex="1" whiteSpace="normal">
                                Appointment: August 15, 2024
                            </Heading>
                            <Spacer />
                            <Text fontWeight="bold">Dr. Patel (Nutritionist)</Text>
                        </Flex>
                        <UnorderedList>
                            <ListItem>Discussed weight loss goals and tracking progress.</ListItem>
                            <ListItem>Advised on incorporating more protein-rich foods into diet.</ListItem>
                            <ListItem>Recommended a follow-up with a nutritionist for personalized meal planning.</ListItem>
                            <ListItem>Reviewed updated exercise routine, including cardiovascular workouts.</ListItem>
                            <ListItem fontWeight="bold">Next Appointment: September 15, 2024</ListItem>
                        </UnorderedList>
                    </Box>

                    <Divider />

                    {/* Appointment Summary 4 */}
                    <Box borderWidth="1px" borderRadius="md" padding="1.5rem" bg="#F9FAFB" boxShadow="sm">
                        <Flex align="center" flexWrap="wrap">
                            <Heading as="h2" size="md" color="#335d8f" mb={2} flex="1" whiteSpace="normal">
                                Appointment: July 5, 2024
                            </Heading>
                            <Spacer />
                            <Text fontWeight="bold">Dr. Adams (Orthopedic)</Text>
                        </Flex>
                        <UnorderedList>
                            <ListItem>Followed up on recovery after minor surgery; healing as expected.</ListItem>
                            <ListItem>Updated prescriptions for pain management.</ListItem>
                            <ListItem>Reviewed physical therapy progress; no further sessions required.</ListItem>
                            <ListItem>Scheduled an upcoming preventive screening test.</ListItem>
                            <ListItem fontWeight="bold">Next Appointment: August 5, 2024</ListItem>
                        </UnorderedList>
                    </Box>

                    <Divider />

                    {/* Appointment Summary 5 */}
                    <Box borderWidth="1px" borderRadius="md" padding="1.5rem" bg="#F9FAFB" boxShadow="sm">
                        <Flex align="center" flexWrap="wrap">
                            <Heading as="h2" size="md" color="#335d8f" mb={2} flex="1" whiteSpace="normal">
                                Appointment: June 10, 2024
                            </Heading>
                            <Spacer />
                            <Text fontWeight="bold">Dr. Brown (Dentist)</Text>
                        </Flex>
                        <UnorderedList>
                            <ListItem>Evaluated symptoms of seasonal allergies; prescribed antihistamines.</ListItem>
                            <ListItem>Discussed overall health; blood pressure and heart rate within normal range.</ListItem>
                            <ListItem>Referred to a specialist for a detailed cardiac evaluation.</ListItem>
                            <ListItem>Advised on allergy-friendly foods and lifestyle adjustments.</ListItem>
                            <ListItem fontWeight="bold">Next Appointment: July 10, 2024</ListItem>
                        </UnorderedList>
                    </Box>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default MeetingSummaries;
