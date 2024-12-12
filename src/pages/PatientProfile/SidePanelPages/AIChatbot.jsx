import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    VStack,
    Heading,
    Text,
    Divider,
    Input,
    Textarea,
    Button,
    Icon,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import { FaRobot, FaUser } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIChatbot() {
    const [question, setQuestion] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [awaitingDetails, setAwaitingDetails] = useState(false);
    const [initialQuestion, setInitialQuestion] = useState("");
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(true);

    const handleInitialSubmit = async () => {
        if (!question.trim()) return;
        setLoading(true);

        const newResponses = [...responses, { question, response: "Can you give me some more details?" }];
        setResponses(newResponses);
        setInitialQuestion(question);
        setQuestion("");

        setAwaitingDetails(true);
        setLoading(false);
    };

    const handleDetailsSubmit = async () => {
        if (!additionalDetails.trim()) return;
        setLoading(true);

        const newResponses = [...responses, { question: additionalDetails, response: "Thinking..." }];
        setResponses(newResponses);

        try {
            const finalResponse = await generateFinalResponse(initialQuestion, additionalDetails);
            newResponses[newResponses.length - 1].response = finalResponse;
            setResponses(newResponses);
            resetChatState();
        } catch (error) {
            console.error("Error:", error);
            newResponses[newResponses.length - 1].response = "Sorry, I couldn't process your question. Please try again.";
            setResponses(newResponses);
        } finally {
            setLoading(false);
        }
    };

    const generateFinalResponse = async (initialQuestion, additionalDetails) => {
        const genAI = new GoogleGenerativeAI("AIzaSyBjS1JWxIHWelk5RAByztdZ2WzS2X2tlf0"); // Replace with your actual API key
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        A user asked: "${initialQuestion}"
        
        Additional details provided: "${additionalDetails}"
        
        Based on the initial question and these additional details, please generate a simple, short, and straightforward response in clear language.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    };

    const resetChatState = () => {
        setAwaitingDetails(false);
        setInitialQuestion("");
        setAdditionalDetails("");
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
                            This AI Chatbot is a beta feature designed to provide general health information.
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
                {/* Header */}
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
                        AI Chatbot
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} textAlign="center" color="#335d8f">
                        How can I help you today? Type your question below.
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
                        padding="1.5rem"
                        overflowY="auto"
                        maxHeight="70vh"
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
                                        <Text style={styles.sectionTitle}>AI Chatbot:</Text>
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
                    width={{ base: "95%", md: "90%", lg: "80%" }}
                    maxWidth="1200px"
                    mx="auto"
                    mt={4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="1.5rem"
                    bg="rgba(255, 255, 255, 0.8)"
                    borderRadius="md"
                    boxShadow="0px 2px 8px rgba(0, 0, 0, 0.2)"
                >
                    {!awaitingDetails ? (
                        <>
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
                            />
                            <Button
                                bg="#003366"
                                color="white"
                                _hover={{ bg: "#002244" }}
                                fontSize="md"
                                paddingX="2rem"
                                paddingY="1.5rem"
                                borderRadius="md"
                                onClick={handleInitialSubmit}
                                isLoading={loading}
                            >
                                Submit
                            </Button>
                        </>
                    ) : (
                        <>
                            <Textarea
                                placeholder="Provide additional details here..."
                                value={additionalDetails}
                                onChange={(e) => setAdditionalDetails(e.target.value)}
                                bg="#F9FAFB"
                                borderRadius="md"
                                size="md"
                                width="100%"
                                maxWidth="700px"
                                mr={4}
                                disabled={loading}
                            />
                            <Button
                                bg="#003366"
                                color="white"
                                _hover={{ bg: "#002244" }}
                                fontSize="md"
                                paddingX="2rem"
                                paddingY="1.5rem"
                                borderRadius="md"
                                onClick={handleDetailsSubmit}
                                isLoading={loading}
                            >
                                Submit
                            </Button>
                        </>
                    )}
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
