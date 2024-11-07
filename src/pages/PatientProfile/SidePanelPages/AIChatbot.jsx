import { ChakraProvider, Box, VStack, Heading, Text, Divider, Input, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

function AIChatbot() {
    const [question, setQuestion] = useState("");
    const [responses, setResponses] = useState([]);

    const handleQuestionSubmit = () => {
        if (question.trim()) {
            // Add the question and a placeholder response to the responses list
            setResponses([...responses, { question, response: "Here is a response from the AI chatbot." }]);
            setQuestion(""); // Clear the input after submission
        }
    };

    return (
        <ChakraProvider>
            <Box 
                bgGradient="linear(to-br, teal.50, gray.50)" 
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
                    <Heading as="h1" size="lg" textAlign="center" color="#006d5b" whiteSpace="normal" wordBreak="break-word">
                        How can I help you today?
                    </Heading>
                    <Text fontSize={{ base: "sm", md: "md" }} textAlign="center" color="#2a5950">
                        Type your question below to ask the AI Chatbot about health, wellness, and more.
                    </Text>
                    <Divider />

                    {/* Input for user question */}
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
                        <Button colorScheme="teal" size="md" onClick={handleQuestionSubmit}>
                            Submit
                        </Button>
                    </Flex>

                    <Divider />

                    {/* Displaying question and responses */}
                    <VStack spacing={4} align="stretch">
                        {responses.map((item, index) => (
                            <Box key={index} borderWidth="1px" borderRadius="md" padding="1.5rem" bg="#F9FAFB" boxShadow="sm">
                                <Text fontWeight="bold" color="#2a5950">You asked:</Text>
                                <Text mb={2}>{item.question}</Text>
                                <Divider />
                                <Text fontWeight="bold" color="#2a5950" mt={2}>AI Chatbot:</Text>
                                <Text>{item.response}</Text>
                            </Box>
                        ))}
                    </VStack>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default AIChatbot;
