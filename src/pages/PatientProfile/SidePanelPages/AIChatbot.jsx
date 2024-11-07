import React, { useState } from 'react';
import {
    ChakraProvider,
    Box,
    VStack,
    Heading,
    Text,
    Divider,
    Input,
    Button,
    HStack,
    Flex
} from "@chakra-ui/react";

function AIChatbot() {
    const [question, setQuestion] = useState("");
    const [responses, setResponses] = useState([]);

    const handleQuestionSubmit = () => {
        if (question.trim()) {
            // Simulate AI response generation
            setResponses([
                ...responses,
                { question, response: "This is a sample response from the AI chatbot based on your question." }
            ]);
            setQuestion(""); // Clear input after submission
        }
    };

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
                        AI Chatbot
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} textAlign="center" color="#335d8f">
                        How can I help you today? Type your question below.
                    </Text>
                    <Divider />

                    {/* User Input */}
                    <Flex as="form" align="center" justify="center" direction={{ base: "column", md: "row" }} w="100%">
                        <Input 
                            placeholder="Type your question here..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            bg="#F9FAFB"
                            borderRadius="md"
                            size="md"
                            width="100%"
                            maxWidth="700px"
                            mr={{ md: 4 }}
                            mb={{ base: 4, md: 0 }}
                        />
                        <Button
                            bg="#335d8f"  
                            color="white"
                            _hover={{ bg: "#0B2545" }}
                            fontSize="md"
                            paddingX="2rem"
                            paddingY="1.5rem"
                            borderRadius="md"
                            onClick={handleQuestionSubmit}
                        >
                            Submit
                        </Button>
                    </Flex>

                    <Divider />

                    {/* Displaying Responses */}
                    <VStack spacing={4} align="stretch">
                        {responses.map((item, index) => (
                            <Box key={index} style={styles.responseContainer}>
                                <Box style={styles.section}>
                                    <Text style={styles.sectionTitle}>You asked:</Text>
                                    <Text mb={2}>{item.question}</Text>
                                </Box>
                                <Divider />
                                <Box style={styles.section}>
                                    <Text style={styles.sectionTitle}>AI Chatbot:</Text>
                                    <Text>{item.response}</Text>
                                </Box>
                            </Box>
                        ))}
                    </VStack>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

const styles = {
    responseContainer: {
        backgroundColor: '#f9f9fb',
        padding: '1rem',
        borderRadius: '8px',
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
