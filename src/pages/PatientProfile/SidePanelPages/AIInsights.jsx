// import will go up here
import { ChakraProvider, Box, VStack, Heading, Text, Divider } from "@chakra-ui/react";

function AIInsights() {
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
                        AI Insights
                    </Heading>
                    <Divider />
                    <Text fontSize="md">
                        Welcome to the AI Insights page. Here you will find detailed analyses and data-driven insights powered by our cutting-edge AI algorithms.
                    </Text>
                    <Text fontSize="md">
                        The goal of this page is to provide you with actionable information that helps you make informed decisions based on the most accurate data. Stay tuned for upcoming features and insights!
                    </Text>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default AIInsights;

