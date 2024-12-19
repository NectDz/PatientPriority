import React, { useState, useEffect } from "react";
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  CircularProgress,
  CircularProgressLabel,
  useColorMode,
  useColorModeValue,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaCapsules,
  FaWalking,
  FaBed,
  FaTint,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { BiMap, BiSun, BiMoon } from "react-icons/bi";
import { VStack } from "@chakra-ui/react";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Overview from "./Overview";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

function PatientProfile() {
  const [patient, setPatient] = useState(null); //stores patient data, initially empty aka null
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const [doctorFirstName, setDoctorFirstName] = useState(null);
  const [doctorLastName, setDoctorLastName] = useState(null);
  const [doctorEmail, setDoctorEmail] = useState(null);
  const [doctorPFP, setDoctorPFP] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // State for Health Goals
  const [stepsGoal, setStepsGoal] = useState(69);
  const [sleepGoal, setSleepGoal] = useState(80);
  const [waterIntakeGoal, setWaterIntakeGoal] = useState(60);







  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          toast({
            title: "Error",
            description: "No user logged in",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
  
        const patientQuery = query(
          collection(db, "patients"),
          where("email", "==", user.email)
        );
  
        const patientSnapshot = await getDocs(patientQuery);
  
        if (!patientSnapshot.empty) {
          const patientDoc = patientSnapshot.docs[0];
          const patientData = patientDoc.data();
  
          // Convert medications object to an array for easier rendering
          const medicationsArray = patientData.medications
            ? Object.values(patientData.medications)
            : [];
  
          setPatient({
            id: patientDoc.id,
            ...patientData,
            medications: medicationsArray, // Store medications as an array
          });
        } else {
          throw new Error("No patient data found for this email");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load patient data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatient();
  }, [toast]);
  

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      if (patient && patient.doctor_id) { // Only fetch doctor info if doctor_id exists
        try {
          const doctorQuery = query(
            collection(db, "doctor"),
            where("id", "==", patient.doctor_id)
          );
          const doctorSnapshot = await getDocs(doctorQuery);
  
          if (!doctorSnapshot.empty) {
            const doctorData = doctorSnapshot.docs[0].data();
            setDoctorFirstName(doctorData.firstName);
            setDoctorLastName(doctorData.lastName);
            setDoctorEmail(doctorData.email);
            setDoctorPFP(doctorData.profilePicture);
          } else {
            console.warn("No doctor found with the provided ID.");
            setDoctorFirstName("Not Connected");
            setDoctorLastName("To A Doctor");
            setDoctorEmail(null);
            setDoctorPFP(null);
          }
        } catch (error) {
          console.error("Error fetching doctor information:", error);
          setDoctorFirstName("Not Connected");
          setDoctorLastName("To A Doctor");
          setDoctorEmail(null);
          setDoctorPFP(null);
        }
      } else {
        // If no doctor_id is associated
        setDoctorFirstName("Not Connected");
        setDoctorLastName("To A Doctor");
        setDoctorEmail(null);
        setDoctorPFP(null);
      }
    };
  
    fetchDoctorInfo();
  }, [patient]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (patient) {
        try {
          const db = getFirestore();
          const appointmentRef = collection(db, "appointment");
          const appointmentQuery = query(
            appointmentRef,
            where("patient_id", "==", patient.id)
          );
          const appointmentSnapshot = await getDocs(appointmentQuery);
  
          const fetchedAppointments = appointmentSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          // Get current date at midnight for date comparison
          const currentDate = new Date();
          const today = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          );
  
          // Filter and sort upcoming appointments
          const upcoming = fetchedAppointments
            .filter((appointment) => {
              const appointmentDate = appointment.appointmentDate.toDate();
              return appointmentDate >= today;
            })
            .sort(
              (a, b) => a.appointmentDate.toDate() - b.appointmentDate.toDate()
            );
  
          setUpcomingAppointments(upcoming);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };
  
    fetchAppointments();
  }, [patient]);

  // Color mode for dark/light theme
  const { toggleColorMode } = useColorMode();
  const bgColor = "white";
  const textColor = useColorModeValue("gray.800", "white");
  //const btnHover = "#4d7098";

  if (loading) {
    return (
      <ChakraProvider>
        <Flex justify="center" align="center" minH="100vh">
          <Text>Loading patient data...</Text>
        </Flex>
      </ChakraProvider>
    );
  }

  // if the state patient wasn't updated, that means patientSnapshot was empty
  if (!patient) {
    return (
      <ChakraProvider>
        <Flex justify="center" align="center" minH="100vh">
          <Text>No patient data found</Text>
        </Flex>
      </ChakraProvider>
    );
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file from the file input
    if (file) {
      setSelectedImage(file); // Store the file object in state for uploading
    }
  };



  const saveChanges = async () => {
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "No image uploaded",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // create unique file name for image
      const fileName = `${patient.firstName}_profile_picture`;
      // create a ref path for the image
      const imageRef = ref(storage, `ProfileImages/${fileName}`);
      await uploadBytes(imageRef, selectedImage);
      // get the firebase Storage URL
      const downloadURL = await getDownloadURL(imageRef);

      // query the firestore to find the patient document
      const patientQuery = query(
        collection(db, "patients"),
        where("id", "==", patient.id)
      );

      const patientSnapshot = await getDocs(patientQuery);

      if (!patientSnapshot.empty) {
        // get the first document from the patientSnapshot array (there should only be one thing in the array anyways)
        const patientDoc = patientSnapshot.docs[0];
        // get the path reference for the patient docuemtn
        const patientDocRef = doc(db, "patients", patientDoc.id);

        // update the profilePicture field in Firestore
        await updateDoc(patientDocRef, {
          profilePicture: downloadURL,
        });

        // update the patien state
        setPatient((prev) => ({
          ...prev,
          profilePicture: downloadURL,
        }));

        toast({
          title: "Success",
          description: "Profile picture updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setIsModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Patient document not found in Firestore.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast({
        title: "Error",
        description: "Failed to update profile picture.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fullAddress = `${patient.address?.street || ""} ${
    patient.address?.city || ""
  }, ${patient.address?.state || ""} ${patient.address?.zip || ""}`;

  return (
    <ChakraProvider>
      <Flex bg="#f1f8ff" minH="100vh" p={10} pt={24} pr={100}>
        <Button
          position="fixed"
          top="4"
          right="4"
          onClick={toggleColorMode}
          color="#335d8f"
          variant="outline"
        >
          {useColorModeValue(<BiMoon />, <BiSun />)}
        </Button>

        {/* Left Side - Patient Info, Health Overview, and Appointments */}
        <Box flex="2" pr={8}>
          {/* Patient Info */}
          <Box
            bg={bgColor}
            borderRadius="xl"
            shadow="xl"
            p={8}
            mb={8}
            maxW="3xl"
            mx="auto"
            textAlign="center"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
            padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
            transition="all 0.3s"
            _hover={{ boxShadow: "2xl" }}
          >
            {/* Patient Image*/}
            <Box justifyItems="center">
              {patient.profilePicture ? (
                <Box
                  position="relative"
                  borderRadius="full"
                  boxSize="120px"
                  mr={4}
                  overflow="hidden"
                  _hover={{
                    "& .edit-overlay": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                >
                  <Image
                    borderRadius="full"
                    boxSize="120px"
                    src={patient.profilePicture}
                    alt="Profile"
                    border="2px solid"
                    borderColor="#00366d"
                    objectFit="cover"
                  />
                  <Box
                    className="edit-overlay"
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    height="40%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(0,0,0,0.5)"
                    color="white"
                    borderBottomRadius="full"
                    opacity={0}
                    visibility="hidden"
                    transition="opacity 0.2s, visibility 0.2s"
                    cursor="pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Edit
                  </Box>
                </Box>
              ) : (
                <Box
                  position="relative"
                  borderRadius="full"
                  boxSize="120px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bg="gray.200"
                  color="gray.600"
                  fontSize="sm"
                  mr={4}
                  border="2px solid"
                  borderColor="#00366d"
                  _hover={{
                    "& .edit-overlay": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                >
                  <Text>No Image Available</Text>
                  <Box
                    className="edit-overlay"
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    height="40%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(0,0,0,0.5)"
                    color="white"
                    borderBottomRadius="full"
                    opacity={0}
                    visibility="hidden"
                    transition="opacity 0.2s, visibility 0.2s"
                    cursor="pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Edit
                  </Box>
                </Box>
              )}
            </Box>
            <Heading fontSize="2xl" color="#00366d" textAlign="center" mb={4}>
              {patient.firstName} {patient.lastName}
            </Heading>
            <Flex justify="center" align="center" color="#335d8f" mt={2}>
              <Icon as={FaUserAlt} mr={2} />
              <Text fontSize="lg">Date Of Birth: {patient.dob}</Text>
            </Flex>
            <Flex justify="center" align="center" color="#335d8f" mt={2}>
              <Icon as={BiMap} mr={2} />
              <Text fontSize="md">Address: {fullAddress} </Text>
            </Flex>
            <Text fontSize="md" color="#335d8f">
              Phone: {patient.phone}
            </Text>
            <Stack direction="row" spacing={4} mt={6} justify="center">
              {/* <Button
                bg="#335d8f"
                color="white"
                onClick={() => setIsModalOpen(true)}
                _hover={{ bg: "#4d7098" }}
              >
                Update Profile
              </Button> */}
              {/* <Button
                color="#00366d"
                variant="outline"
                // onClick={downloadProfile}
                _hover={{ bg: "#e6eef7", color: "#335d8f" }}
              >
                Share with Family
              </Button> */}
            </Stack>
          </Box>

          {/* Health Overview */}

          <Box
            bg={bgColor}
            borderRadius="xl"
            shadow="xl"
            p={8}
            mb={8}
            maxW="3xl"
            mx="auto"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
            padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
            transition="all 0.3s"
            _hover={{ boxShadow: "2xl" }}
            position="relative" // Added for absolute positioning of "View More"
          >
            {/* View More Button */}
            <Box position="absolute" bottom="1rem" right="1rem">
              <RouterLink to="/patient-profile/overview">
                <Button
                  size="sm"
                  bg="#00366d"
                  color="white"
                  _hover={{ bg: "#335d8f" }}
                  transition="all 0.3s"
                  onClick={() => {
                    console.log("Navigating to: /patient-profile/overview");
                    navigate("/patient-profile/overview");
                  }}
                >
                  View More
                </Button>
              </RouterLink>
            </Box>

            <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
              Health Overview
            </Heading>
            <Stack direction="row" spacing={10} justify="space-around">
              {/* Current Health Information */}
              <Box>
                <Flex align="center" color="gray.600" mb={2}>
                  <Icon as={MdHealthAndSafety} mr={2} />
                  <Text fontWeight="bold" fontSize="lg" color="#00366d">
                    Current Health Information:
                  </Text>
                </Flex>
                <List spacing={1} color="#335d8f">
                  <ListItem>Allergies: {patient.allergies || "None reported"}</ListItem>
                  <ListItem>Lifestyle: {patient.lifestyle || "Not provided"}</ListItem>
                  <ListItem>
                    Physical Activity: {patient.physicalActivity || "Not provided"}
                  </ListItem>
                </List>
              </Box>

              {/* Current Medications */}
              <Box>
              <Flex align="center" color="gray.600" mb={2}>
                <Icon as={FaCapsules} mr={2} />
                <Text fontWeight="bold" fontSize="lg" color="#00366d">
                  Current Medications:
                </Text>
              </Flex>
              <Box mt={2}>
                {patient.medications && patient.medications.length > 0 ? (
                  <Text color="#335d8f" fontSize="sm" fontWeight="bold">
                    {patient.medications
                      .map((med) => (med.name ? med.name.toUpperCase() : "NOT SPECIFIED"))
                      .join(", ")}
                  </Text>
                ) : (
                  <Text color="gray.500">None reported</Text>
                )}
              </Box>
            </Box>
            </Stack>
          </Box>

          {/* Upcoming Appointments */}
          <Box
            bg={bgColor}
            borderRadius="xl"
            shadow="xl"
            p={8}
            maxW="3xl"
            mx="auto"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
            padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
            transition="all 0.3s"
            _hover={{ boxShadow: "2xl" }}
            position="relative"
          >
            <Box position="absolute" bottom="1rem" right="1rem">
              <RouterLink to="/patient-profile/reminders-and-appointments">
                <Button
                  size="sm"
                  bg="#00366d"
                  color="white"
                  _hover={{ bg: "#335d8f" }}
                  transition="all 0.3s"
                >
                  View More
                </Button>
              </RouterLink>
            </Box>

            <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
              Upcoming Appointments
            </Heading>
            
            {loading ? (
              <Text color="gray.600">Loading...</Text>
            ) : upcomingAppointments.length === 0 ? (
              <Text color="gray.600">No upcoming appointments</Text>
            ) : (
              <List spacing={3} color="#335d8f">
                {upcomingAppointments.slice(0, 3).map((appointment) => (
                  <ListItem key={appointment.id}>
                    <Flex align="center">
                      <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                      <Badge color="#335d8f" mr={2}>
                        {new Date(appointment.appointmentDate.seconds * 1000).toLocaleDateString()}
                      </Badge>
                      <Tooltip label="Add to Google Calendar" placement="top">
                        <Link
                          href="https://calendar.google.com/calendar/r/eventedit"
                          isExternal
                          color="#335d8f"
                          fontWeight="bold"
                          _hover={{ color: "#00366d" }}
                        >
                          {appointment.appointmentDescription}
                        </Link>
                      </Tooltip>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>

        {/* Right Side - Google Calendar, Editable Health Goals, and Recent Medications History */}
        <Box
          flex="1"
          bg={bgColor}
          borderRadius="xl"
          shadow="xl"
          p={8}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
        >
          {/* Google Calendar Embed */}
          <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
            Calendar
          </Heading>
          <Box mb={8} borderRadius="md" overflow="hidden" height="400px">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=your_calendar_id%40group.calendar.google.com&ctz=America%2FNew_York"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </Box>

          {/* Editable Health Goals with Sliders and Icons */}
          <Heading
            fontSize="xl"
            color="#00366d"
            mt={8}
            mb={4}
            textAlign="center"
          >
            Doctor Information
          </Heading>
          <Box mb={6}>
            <Flex align="center">
              
              {doctorPFP ? (
                <Image
                  src={doctorPFP}
                  alt={`${doctorFirstName} ${doctorLastName}`}
                  boxSize="80px"
                  borderRadius="full"
                  mr={4} // Adds spacing between the image and the text
                  border="2px solid"
                  borderColor="#00366d"
                />
              ) : (
                <Box
                  boxSize="80px"
                  borderRadius="full"
                  bg="gray.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  mr={4}
                  border="1px solid"
                  borderColor="#00366d"
                >
                  No Image
                </Box>
              )}

              <Box>
                <Text fontSize="lg" fontWeight="bold" color="#00366d">
                  {doctorFirstName} {doctorLastName}
                </Text>
                <Text fontSize="m" color="gray.600">
                  {doctorEmail}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Recent Medications History */}
          <Heading
            fontSize="xl"
            color="#00366d"
            mt={8}
            mb={4}
            textAlign="center"
          >
            Recent Medications History
          </Heading>
          <List spacing={1} color="#335d8f">
            {patient.medications && Object.keys(patient.medications).length > 0 ? (
              Object.values(patient.medications).map((med, index) => (
                <ListItem key={index}>
                  {med.name} ({med.dosage}, {med.frequency})
                </ListItem>
              ))
            ) : (
              <ListItem>No Medications</ListItem>
            )}
          </List>
        </Box>

        {/* Edit Image Modal */}
        <Modal isOpen={isModalOpen} onClose={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}>
          <ModalOverlay />
          <ModalContent borderRadius="lg" maxWidth="400px">
            <ModalHeader color="#00366d" fontWeight="bold">Update Profile Picture</ModalHeader>
            <ModalCloseButton color="#00366d"/>
            <ModalBody>
            <VStack spacing={4} width="full" alignItems="flex-start">
              <Input 
                type="file" 
                p={0}
                border="none"
                sx={{
                  '::file-selector-button': {
                    height: '40px',
                    marginRight: '15px',
                    background: '#deeffe',
                    color: '#00366d',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer'
                  }
                }}
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <Flex width="full" alignItems="center">
                  <Text mr={2} color="gray.600">{selectedImage.name}</Text>
                  <Text color="gray.500" fontSize="sm">({(selectedImage.size / 1024).toFixed(2)} KB)</Text>
                </Flex>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={() => {
                setIsModalOpen(false);
                setSelectedImage(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              color="white" 
              bg="#00366d" 
              _hover={{ bg: "#335d8f" }}
              onClick={saveChanges}
              isDisabled={!selectedImage}
            >
              Save Changes
            </Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
