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
    Flex
} from "@chakra-ui/react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google Generative AI

function AIChatbot() {
    const [question, setQuestion] = useState("");
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleQuestionSubmit = async () => {
        if (!question.trim()) return; // Avoid empty submissions
        setLoading(true);

        // Append the user's question to responses
        const newResponses = [...responses, { question, response: "Thinking..." }];
        setResponses(newResponses);
        setQuestion(""); // Clear input after submission

        try {
            const genAI = new GoogleGenerativeAI("AIzaSyBjS1JWxIHWelk5RAByztdZ2WzS2X2tlf0"); // Replace with your actual API key
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            // Construct prompt
            const prompt = `
            Here is a health-related question from a user:
            
            "${question}"
            
            Respond to this question in a clear, helpful way without complex medical jargon. Keep it brief and easy to understand.`;

            const result = await model.generateContent(prompt);

            // Extract response text from result
            const aiResponse = result.response.text();

            // Update the last response with the AI's actual response
            newResponses[newResponses.length - 1].response = aiResponse;
            setResponses(newResponses);
        } catch (error) {
            console.error("Error:", error);
            // If there's an error, update response to show a failure message
            newResponses[newResponses.length - 1].response = "Sorry, I couldn't process your question. Please try again.";
            setResponses(newResponses);
        } finally {
            setLoading(false);
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
                            disabled={loading} // Disable input while loading
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
                            isLoading={loading} // Show loading state
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
