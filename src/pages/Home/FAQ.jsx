// FAQ.jsx

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  useTheme,
} from "@chakra-ui/react";

const FAQ = () => {
  const theme = useTheme();
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={8}
      backgroundColor="background"
    >
      <Box height="100px" />

      {/* Header Section */}
      <Heading fontSize="6xl" color="primary" mb={4} textAlign="center">
        FAQ
      </Heading>
      <Text fontSize="2xl" color="secondary" textAlign="center" mb={12} maxW="80%">
        Frequently Asked Questions
      </Text>

      {/* Coming Soon Section */}
      <VStack spacing={10} align="stretch" width={{ base: "90%", md: "70%", lg: "60%" }} mx="auto">
        <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg">
          <Heading fontSize="3xl" color="primary" mb={4}>
            FAQ Page Coming Soon!
          </Heading>
          <Divider mb={4} borderColor="secondary" />
          <Text fontSize="lg" color="secondary" lineHeight="1.7">
            We’re working hard to answer your most common questions. Check back soon for updates!
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default FAQ;
