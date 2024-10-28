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
  // State to manage profile information
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

  // State to control modal visibility and form data
  const [isOpen, setIsOpen] = useState(false);
  const [newProfile, setNewProfile] = useState(profile); // Temporary state for form data

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile data
  const saveChanges = () => {
    setProfile(newProfile); // Update main profile state
    closeModal();
  };

  // Download profile as a text file
  const downloadProfile = () => {
    const profileText = `
      Patient Profile:
      Name: ${profile.name}
      Age: ${profile.age}
      Address: ${profile.address}
      Phone: ${profile.phone}
      
      Health Overview:
      Blood Pressure: ${profile.bloodPressure}
      Heart Rate: ${profile.heartRate}
      Blood Sugar Level: ${profile.bloodSugar}
      
      Current Medications:
      ${profile.medications.join(", ")}

      Reminders & Appointments:
      - Oct 20, 2024: General Checkup
      - Nov 1, 2024: Blood Test Follow-up
      - Dec 5, 2024: Vaccination
    `;
    
    // Create a blob and a download link
    const blob = new Blob([profileText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'PatientProfile.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
            <Button colorScheme="teal" variant="outline" onClick={downloadProfile}>Share with Family</Button>
          </Stack>
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
                <ListItem>Blood Pressure: {profile.bloodPressure}</ListItem>
                <ListItem>Heart Rate: {profile.heartRate}</ListItem>
                <ListItem>Blood Sugar Level: {profile.bloodSugar}</ListItem>
              </List>
            </Box>
            <Box>
              <Flex align="center" color="gray.600" mb={2}>
                <Icon as={FaCapsules} mr={2} />
                <Text fontWeight="bold">Current Medications:</Text>
              </Flex>
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
              <Button colorScheme="teal" mr={3} onClick={saveChanges}>Save</Button>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}

export default PatientProfile;
