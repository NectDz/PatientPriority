import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";

function PatientProfile() {
  return (
    <ChakraProvider>
      <Box bg="#EEF4ED" minH="100vh" p={10} pt={24}>
        {/* Patient Info Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto" textAlign="center">
          {/* Placeholder for Patient Info */}
        </Box>

        {/* Health Overview Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto">
          {/* Placeholder for Health Overview */}
        </Box>

        {/* Reminders & Appointments Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} maxW="3xl" mx="auto">
          {/* Placeholder for Reminders & Appointments */}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default PatientProfile;
