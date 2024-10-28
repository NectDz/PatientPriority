import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Stack,
  List,
  ListItem,
  Link,
  Icon,
  Tooltip,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Badge,
} from "@chakra-ui/react";
import { FaUserAlt, FaCalendarAlt, FaCapsules } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BiMap } from "react-icons/bi";

function PatientProfile() {
  // State for profile information and modal visibility
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: 45,
    address: "1234 Elm Street, Springfield",
    phone: "(555) 123-4567",
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    bloodSugar: "Normal",
    medications: ["Amlodipine 10mg", "Metformin 500mg"],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [newProfile, setNewProfile] = useState(profile); // Temporary state for form

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ChakraProvider>
      <Box bg="#EEF4ED" minH="100vh" p={10} pt={24}>
        {/* Patient Info Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto" textAlign="center">
          <Image borderRadius="full" boxSize="120px" src="https://via.placeholder.com/120" alt="Profile" mx="auto" mb={4} border="4px solid" borderColor="teal.300" />
          <Heading fontSize="2xl" color="#252B42">{profile.name}</Heading>
          <Flex justify="center" align="center" color="gray.500" mt={2}>
            <Icon as={FaUserAlt} mr={2} />
            <Text fontSize="lg">Age: {profile.age}</Text>
          </Flex>
          <Flex justify="center" align="center" color="gray.500" mt={2}>
            <Icon as={BiMap} mr={2} />
            <Text fontSize="md">Address: {profile.address}</Text>
          </Flex>
          <Text fontSize="md" color="gray.500">Phone: {profile.phone}</Text>
          
          {/* Action buttons */}
          <Stack direction="row" spacing={4} mt={6} justify="center">
            <Button colorScheme="teal" variant="solid" onClick={openModal}>Update Profile</Button>
          </Stack>
        </Box>

        {/* Health Overview Section */}
        <Box bg="white" borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto">
          <Heading fontSize="xl" color="#252B42" mb={4} textAlign="center">Health Overview</Heading>
          <Stack direction="row" spacing={10} justify="space-around">
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>Current Health Information:</Text>
              <List spacing={1} color="gray.500">
                <ListItem>Blood Pressure: {profile.bloodPressure}</ListItem>
                <ListItem>Heart Rate: {profile.heartRate}</ListItem>
                <ListItem>Blood Sugar Level: {profile.bloodSugar}</ListItem>
              </List>
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>Current Medications:</Text>
              <List spacing={1} color="gray.500">
                {profile.medications.map((med, index) => (
                  <ListItem key={index}>{med}</ListItem>
                ))}
              </List>
            </Box>
          </Stack>
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

        {/* Update Profile Modal */}
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input placeholder="Name" mb={4} name="name" value={newProfile.name} onChange={handleChange} />
              <Input placeholder="Age" mb={4} name="age" value={newProfile.age} onChange={handleChange} />
              <Input placeholder="Address" mb={4} name="address" value={newProfile.address} onChange={handleChange} />
              <Input placeholder="Phone" mb={4} name="phone" value={newProfile.phone} onChange={handleChange} />
              <Input placeholder="Blood Pressure" mb={4} name="bloodPressure" value={newProfile.bloodPressure} onChange={handleChange} />
              <Input placeholder="Heart Rate" mb={4} name="heartRate" value={newProfile.heartRate} onChange={handleChange} />
              <Input placeholder="Blood Sugar Level" mb={4} name="bloodSugar" value={newProfile.bloodSugar} onChange={handleChange} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={() => { setProfile(newProfile); closeModal(); }}>Save</Button>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default PatientProfile;
