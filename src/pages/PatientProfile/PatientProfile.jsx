import React from "react";
import { ChakraProvider, Box, Heading, Image, Text, Flex, Icon, List, ListItem, Link, Badge, Tooltip } from "@chakra-ui/react";
import { FaUserAlt, FaCalendarAlt, FaCapsules } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BiMap } from "react-icons/bi";

function PatientProfile() {
  return (
    <ChakraProvider>
      <Box bg="#EEF4ED" minH="100vh" p={10} pt={24}>
        {/* Patient Info Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto" textAlign="center">
          <Image borderRadius="full" boxSize="120px" src="https://via.placeholder.com/120" alt="Profile" mx="auto" mb={4} border="4px solid" borderColor="teal.300" />
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
          <Flex justify="space-around">
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>Current Health Information:</Text>
              <List spacing={1} color="gray.500">
                <ListItem>Blood Pressure: 120/80</ListItem>
                <ListItem>Heart Rate: 72 bpm</ListItem>
                <ListItem>Blood Sugar Level: Normal</ListItem>
              </List>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>Current Medications:</Text>
              <List spacing={1} color="gray.500">
                <ListItem>Amlodipine 10mg</ListItem>
                <ListItem>Metformin 500mg</ListItem>
              </List>
            </Box>
          </Flex>
        </Box>

        {/* Reminders & Appointments Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} maxW="3xl" mx="auto">
          <Heading fontSize="xl" color="#252B42" mb={4} textAlign="center">Reminders & Appointments</Heading>
          <List spacing={3} color="gray.500">
            <ListItem>
              <Flex align="center">
                <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                <Badge colorScheme="teal" mr={2}>Oct 20, 2024</Badge>
                <Tooltip label="Add to Google Calendar" placement="top">
                  <Link href="https://calendar.google.com/calendar/r/eventedit" isExternal color="teal.600" fontWeight="bold" _hover={{ color: "teal.800" }}>
                    General Checkup
                  </Link>
                </Tooltip>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex align="center">
                <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                <Badge colorScheme="teal" mr={2}>Nov 1, 2024</Badge>
                <Tooltip label="Add to Google Calendar" placement="top">
                  <Link href="https://calendar.google.com/calendar/r/eventedit" isExternal color="teal.600" fontWeight="bold" _hover={{ color: "teal.800" }}>
                    Blood Test Follow-up
                  </Link>
                </Tooltip>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex align="center">
                <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                <Badge colorScheme="teal" mr={2}>Dec 5, 2024</Badge>
                <Tooltip label="Add to Google Calendar" placement="top">
                  <Link href="https://calendar.google.com/calendar/r/eventedit" isExternal color="teal.600" fontWeight="bold" _hover={{ color: "teal.800" }}>
                    Vaccination
                  </Link>
                </Tooltip>
              </Flex>
            </ListItem>
          </List>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default PatientProfile;
