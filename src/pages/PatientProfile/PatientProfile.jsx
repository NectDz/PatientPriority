import React from "react";
import { ChakraProvider, Box, Heading, Image, Flex, Text, Icon, Stack, List, ListItem } from "@chakra-ui/react";
import { FaUserAlt, FaCapsules } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BiMap } from "react-icons/bi";

function PatientProfile() {
  return (
    <ChakraProvider>
      <Box bg="#EEF4ED" minH="100vh" p={10} pt={24}>
        {/* Patient Info Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto" textAlign="center">
          <Image borderRadius="full" boxSize="120px" src="https://via.placeholder.com/120" alt="Profile" mx="auto" mb={4} />
          <Heading fontSize="2xl" color="#252B42">John Doe</Heading>
          <Flex justify="center" align="center" color="gray.500" mt={2}>
            <Icon as={FaUserAlt} mr={2} />
            <Text fontSize="lg">Age: 45</Text>
          </Flex>
          <Flex justify="center" align="center" color="gray.500" mt={2}>
            <Icon as={BiMap} mr={2} />
            <Text fontSize="md">Address: 1234 Elm Street, Springfield</Text>
          </Flex>
          <Text fontSize="md" color="gray.500">Phone: (555) 123-4567</Text>
        </Box>

        {/* Health Overview Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto">
          <Heading fontSize="xl" color="#252B42" mb={4} textAlign="center">Health Overview</Heading>
          <Stack direction="row" spacing={10} justify="space-around">
            <Box>
              <Flex align="center" color="gray.600" mb={2}>
                <Icon as={MdHealthAndSafety} mr={2} />
                <Text fontWeight="bold">Current Health Information:</Text>
              </Flex>
              <List spacing={1} color="gray.500">
                <ListItem>Blood Pressure: 120/80</ListItem>
                <ListItem>Heart Rate: 72 bpm</ListItem>
                <ListItem>Blood Sugar Level: Normal</ListItem>
              </List>
            </Box>
            <Box>
              <Flex align="center" color="gray.600" mb={2}>
                <Icon as={FaCapsules} mr={2} />
                <Text fontWeight="bold">Current Medications:</Text>
              </Flex>
              <List spacing={1} color="gray.500">
                <ListItem>Amlodipine 10mg</ListItem>
                <ListItem>Metformin 500mg</ListItem>
              </List>
            </Box>
          </Stack>
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
