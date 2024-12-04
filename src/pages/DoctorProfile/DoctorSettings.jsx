import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import {
  ChakraProvider,
  Box,
  Heading,
} from "@chakra-ui/react";

const SettingsPage = () => {

  return (
    <ChakraProvider>
      <Box
        maxWidth="100%"
        width="100%"
        margin="0 auto"
        p={6}
        bg="white"
        borderRadius="md"
        shadow="md"
      >
        <Heading as="h1" size="lg" mb={4}>
          Settings
        </Heading>
    
      </Box>
    </ChakraProvider>
  );
};

export default SettingsPage;
