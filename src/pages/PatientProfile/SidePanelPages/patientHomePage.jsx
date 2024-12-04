// import React, { useState } from "react";
// import {
//   ChakraProvider,
//   Box,
//   Flex,
//   Text,
//   Heading,
//   Image,
//   Stack,
//   List,
//   ListItem,
//   Link,
//   Icon,
//   Tooltip,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Badge,
//   Slider,
//   SliderTrack,
//   SliderFilledTrack,
//   SliderThumb,
//   CircularProgress,
//   CircularProgressLabel,
//   useColorMode,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { FaUserAlt, FaCalendarAlt, FaCapsules, FaWalking, FaBed, FaTint } from "react-icons/fa";
// import { MdHealthAndSafety } from "react-icons/md";
// import { BiMap, BiSun, BiMoon } from "react-icons/bi";

// function PatientProfile() {
//   const [profile, setProfile] = useState({
//     name: "Liam Payne",
//     age: "31",
//     address: "With GOD in Peace",
//     phone: "911",
//     bloodPressure: "0/60",
//     heartRate: "0 bpm",
//     bloodSugar: "Abnormal",
//     medications: ["Coke"],
//     recentMedications: [
//       { name: "Amlodipine", time: "8:00 AM" },
//       { name: "Metformin", time: "12:00 PM" },
//       { name: "Ibuprofen", time: "4:00 PM" },
//     ],
//   });

//   const [isOpen, setIsOpen] = useState(false);
//   const [newProfile, setNewProfile] = useState(profile);

//   // State for Health Goals
//   const [stepsGoal, setStepsGoal] = useState(70);
//   const [sleepGoal, setSleepGoal] = useState(80);
//   const [waterIntakeGoal, setWaterIntakeGoal] = useState(60);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const saveChanges = () => {
//     setProfile(newProfile);
//     closeModal();
//   };

//   const downloadProfile = () => {
//     const profileText = `
//       Patient Profile:
//       Name: ${profile.name}
//       Age: ${profile.age}
//       Address: ${profile.address}
//       Phone: ${profile.phone}

//       Health Overview:
//       Blood Pressure: ${profile.bloodPressure}
//       Heart Rate: ${profile.heartRate}
//       Blood Sugar Level: ${profile.bloodSugar}

//       Current Medications:
//       ${profile.medications.join(", ")}

//       Reminders & Appointments:
//       - Oct 20, 2024: General Checkup
//       - Nov 1, 2024: Blood Test Follow-up
//       - Dec 5, 2024: Vaccination
//     `;
//     const blob = new Blob([profileText], { type: "text/plain" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "PatientProfile.txt";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   };

//   // Color mode for dark/light theme
//   const { toggleColorMode } = useColorMode();
//   const bgColor ="white";
//   const textColor = useColorModeValue("gray.800", "white");
//   //const btnHover = "#4d7098";

//   return (
//     <ChakraProvider>
//       <Flex bg="#f1f8ff" minH="100vh" p={10} pt={24} pr={100}>
//         <Button
//           position="fixed"
//           top="4"
//           right="4"
//           onClick={toggleColorMode}
//           color="#335d8f"
//           variant="outline"
//         >
//           {useColorModeValue(<BiMoon />, <BiSun />)}
//         </Button>

//         {/* Left Side - Patient Info, Health Overview, and Reminders */}
//         <Box flex="2" pr={8}>
//           {/* Patient Info */}
//           <Box
//             bg={bgColor}
//             borderRadius="xl"
//             shadow="xl"
//             p={8}
//             mb={8}
//             maxW="3xl"
//             mx="auto"
//             textAlign="center"
//                     boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
//                     padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
//                     transition="all 0.3s"
//                     _hover={{ boxShadow: "2xl" }}
//           >
//             <Image
//               borderRadius="full"
//               boxSize="120px"
//               src="data:image/jpeg;base64,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"
//               alt="Profile"
//               mx="auto"
//               mb={4}
//               border="4px solid"
//               borderColor="#00366d"
//             />
//             <Heading fontSize="2xl" color="#00366d" textAlign="center" mb={4}>
//               {profile.name}
//             </Heading>
//             <Flex justify="center" align="center" color="#335d8f" mt={2}>
//               <Icon as={FaUserAlt} mr={2} />
//               <Text fontSize="lg">Age: {profile.age}</Text>
//             </Flex>
//             <Flex justify="center" align="center" color="#335d8f" mt={2}>
//               <Icon as={BiMap} mr={2} />
//               <Text fontSize="md">Address: {profile.address}</Text>
//             </Flex>
//             <Text fontSize="md" color="#335d8f">
//               Phone: {profile.phone}
//             </Text>
//             <Stack direction="row" spacing={4} mt={6} justify="center">
//               <Button bg="#335d8f" color="white" onClick={openModal} _hover={{ bg: "#4d7098" }}>
//                 Update Profile
//               </Button>
//               <Button color="#00366d" variant="outline" onClick={downloadProfile} _hover={{ bg: "#e6eef7", color: "#335d8f" }}>
//                 Share with Family
//               </Button>
//             </Stack>
//           </Box>

//           {/* Health Overview */}
//           <Box bg={bgColor} borderRadius="xl" shadow="xl" p={8} mb={8} maxW="3xl" mx="auto"
//           boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
//           padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
//           transition="all 0.3s"
//           _hover={{ boxShadow: "2xl" }}
//           >
//             <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
//               Health Overview
//             </Heading>
//             <Stack direction="row" spacing={10} justify="space-around">
//               <Box>
//                 <Flex align="center" color="gray.600" mb={2}>
//                   <Icon as={MdHealthAndSafety} mr={2} />
//                   <Text fontWeight="bold">Current Health Information:</Text>
//                 </Flex>
//                 <List spacing={1} color="#335d8f">
//                   <ListItem>Blood Pressure: {profile.bloodPressure}</ListItem>
//                   <ListItem>Heart Rate: {profile.heartRate}</ListItem>
//                   <ListItem>Blood Sugar Level: {profile.bloodSugar}</ListItem>
//                 </List>
//               </Box>
//               <Box>
//                 <Flex align="center" color="gray.600" mb={2}>
//                   <Icon as={FaCapsules} mr={2} />
//                   <Text fontWeight="bold">Current Medications:</Text>
//                 </Flex>
//                 <List spacing={1} color="#335d8f">
//                   {profile.medications.map((med, index) => (
//                     <ListItem key={index}>{med}</ListItem>
//                   ))}
//                 </List>
//               </Box>
//             </Stack>
//           </Box>

//           {/* Reminders & Appointments */}
//           <Box bg={bgColor} borderRadius="xl" shadow="xl" p={8} maxW="3xl" mx="auto"
//           boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
//           padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
//           transition="all 0.3s"
//           _hover={{ boxShadow: "2xl" }}
//           >
//             <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
//               Reminders & Appointments
//             </Heading>
//             <List spacing={3} color="#335d8f">
//               <ListItem>
//                 <Flex align="center">
//                   <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
//                   <Badge color="#335d8f" mr={2}>
//                     Oct 20, 2024
//                   </Badge>
//                   <Tooltip label="Add to Google Calendar" placement="top">
//                     <Link
//                       href="https://calendar.google.com/calendar/r/eventedit"
//                       isExternal
//                       color="#335d8f"
//                       fontWeight="bold"
//                       _hover={{ color: "#00366d" }}
//                     >
//                       General Checkup
//                     </Link>
//                   </Tooltip>
//                 </Flex>
//               </ListItem>
//               <ListItem>
//                 <Flex align="center">
//                   <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
//                   <Badge color="#335d8f" mr={2}>
//                     Nov 1, 2024
//                   </Badge>
//                   <Tooltip label="Add to Google Calendar" placement="top">
//                     <Link
//                       href="https://calendar.google.com/calendar/r/eventedit"
//                       isExternal
//                       color="#335d8f"
//                       fontWeight="bold"
//                       _hover={{ color: "#00366d" }}
//                     >
//                       Blood Test Follow-up
//                     </Link>
//                   </Tooltip>
//                 </Flex>
//               </ListItem>
//               <ListItem>
//                 <Flex align="center">
//                   <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
//                   <Badge color="#335d8f" mr={2}>
//                     Dec 5, 2024
//                   </Badge>
//                   <Tooltip label="Add to Google Calendar" placement="top">
//                     <Link
//                       href="https://calendar.google.com/calendar/r/eventedit"
//                       isExternal
//                       color="#335d8f"
//                       fontWeight="bold"
//                       _hover={{ color: "#00366d" }}
//                     >
//                       Vaccination
//                     </Link>
//                   </Tooltip>
//                 </Flex>
//               </ListItem>
//             </List>
//           </Box>
//         </Box>

//         {/* Right Side - Google Calendar, Editable Health Goals, and Recent Medications History */}
//         <Box flex="1" bg={bgColor} borderRadius="xl" shadow="xl" p={8}
//         boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
//         padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
//         transition="all 0.3s"
//         _hover={{ boxShadow: "2xl" }}
//         >
//           {/* Google Calendar Embed */}
//           <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
//             Upcoming Appointments
//           </Heading>
//           <Box mb={8} borderRadius="md" overflow="hidden" height="400px">
//             <iframe
//               src="https://calendar.google.com/calendar/embed?src=your_calendar_id%40group.calendar.google.com&ctz=America%2FNew_York"
//               style={{ border: 0 }}
//               width="100%"
//               height="100%"
//               frameBorder="0"
//               scrolling="no"
//             ></iframe>
//           </Box>

//           {/* Editable Health Goals with Sliders and Icons */}
//           <Heading fontSize="xl" color="#00366d" mt={8} mb={4} textAlign="center">
//             Health Goals
//           </Heading>
//           <Box mb={6}>
//             <Flex align="center">
//               <Icon as={FaWalking} color="#00366d" mr={2} />
//               <Text color= "#00366d" >Steps per Day: {stepsGoal}%</Text>
//             </Flex>
//             <Slider value={stepsGoal} onChange={setStepsGoal} min={0} max={100}>
//               <SliderTrack bg="gray.200">
//                 <SliderFilledTrack bg="#00366d" />
//               </SliderTrack>
//               <SliderThumb boxSize={6} />
//             </Slider>
//           </Box>
//           <Box mb={6}>
//             <Flex align="center">
//               <Icon as={FaBed} color="blue.500" mr={2} />
//               <Text color= "#00366d">Hours of Sleep: {sleepGoal}%</Text>
//             </Flex>
//             <Slider value={sleepGoal} onChange={setSleepGoal} min={0} max={100}>
//               <SliderTrack bg="gray.200">
//                 <SliderFilledTrack bg="blue.400" />
//               </SliderTrack>
//               <SliderThumb boxSize={6} />
//             </Slider>
//           </Box>
//           <Box mb={6}>
//             <Flex align="center">
//               <Icon as={FaTint} color="cyan.500" mr={2} />
//               <Text color= "#00366d">Water Intake: {waterIntakeGoal}%</Text>
//             </Flex>
//             <Slider value={waterIntakeGoal} onChange={setWaterIntakeGoal} min={0} max={100}>
//               <SliderTrack bg="gray.200">
//                 <SliderFilledTrack bg="cyan.400" />
//               </SliderTrack>
//               <SliderThumb boxSize={6} />
//             </Slider>
//           </Box>

//           {/* Recent Medications History */}
//           <Heading fontSize="xl" color="#00366d" mt={8} mb={4} textAlign="center">
//             Recent Medications History
//           </Heading>
//           <List spacing={3} color="#335d8f">
//             {profile.recentMedications.map((med, index) => (
//               <ListItem key={index}>
//                 {med.name} - Last taken: {med.time}
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* Update Profile Modal */}
//         <Modal isOpen={isOpen} onClose={closeModal}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Update Profile</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody>
//               <Input placeholder="Name" mb={4} name="name" value={newProfile.name} onChange={handleChange} />
//               <Input placeholder="Age" mb={4} name="age" value={newProfile.age} onChange={handleChange} />
//               <Input placeholder="Address" mb={4} name="address" value={newProfile.address} onChange={handleChange} />
//               <Input placeholder="Phone" mb={4} name="phone" value={newProfile.phone} onChange={handleChange} />
//               <Input placeholder="Blood Pressure" mb={4} name="bloodPressure" value={newProfile.bloodPressure} onChange={handleChange} />
//               <Input placeholder="Heart Rate" mb={4} name="heartRate" value={newProfile.heartRate} onChange={handleChange} />
//               <Input placeholder="Blood Sugar Level" mb={4} name="bloodSugar" value={newProfile.bloodSugar} onChange={handleChange} />
//             </ModalBody>
//             <ModalFooter>
//               <Button color="#335d8f" mr={3} onClick={saveChanges}>Save</Button>
//               <Button variant="ghost" onClick={closeModal}>Cancel</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </Flex>
//     </ChakraProvider>
//   );
// }

// export default PatientProfile;

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
  Link
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
import { useNavigate, Link as RouterLink} from "react-router-dom";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

function PatientProfile() {
  const [patient, setPatient] = useState(null); //stores patient data, initially empty aka null
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

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

          // displays medications assuming it is saved as an array in the database (right now its saved a string though)
          const medications = Array.isArray(patientDoc.medications)
            ? patientDoc.medications
            : []; // If there is nothing, make it an empty array

          // update the patient state using the proper data
          setPatient({ id: patientDoc.id, ...patientDoc.data(), medications });
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

  // const downloadProfile = () => {
  //   const profileText = `
  //     Patient Profile:
  //     Name: ${profile.name}
  //     Age: ${profile.age}
  //     Address: ${profile.address}
  //     Phone: ${profile.phone}

  //     Health Overview:
  //     Blood Pressure: ${profile.bloodPressure}
  //     Heart Rate: ${profile.heartRate}
  //     Blood Sugar Level: ${profile.bloodSugar}

  //     Current Medications:
  //     ${profile.medications.join(", ")}

  //     Reminders & Appointments:
  //     - Oct 20, 2024: General Checkup
  //     - Nov 1, 2024: Blood Test Follow-up
  //     - Dec 5, 2024: Vaccination
  //   `;
  //   const blob = new Blob([profileText], { type: "text/plain" });
  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "PatientProfile.txt";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(url);
  // };

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

        {/* Left Side - Patient Info, Health Overview, and Reminders */}
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
            <Image
              borderRadius="full"
              boxSize="120px"
              // src="data:image/jpeg;base64,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"
              src={patient.profilePicture}
              alt="Profile"
              mx="auto"
              mb={4}
              border="4px solid"
              borderColor="#00366d"
            />
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
              <Button
                bg="#335d8f"
                color="white"
                onClick={() => setIsModalOpen(true)}
                _hover={{ bg: "#4d7098" }}
              >
                Update Profile
              </Button>
              <Button
                color="#00366d"
                variant="outline"
                // onClick={downloadProfile}
                _hover={{ bg: "#e6eef7", color: "#335d8f" }}
              >
                Share with Family
              </Button>
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
            <Box
              position="absolute"
              bottom="1rem"
              right="1rem"
            >
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
              <Box>
                <Flex align="center" color="gray.600" mb={2}>
                  <Icon as={MdHealthAndSafety} mr={2} />
                  <Text fontWeight="bold">Current Health Information:</Text>
                </Flex>
                <List spacing={1} color="#335d8f">
                  <ListItem>Allergies: {patient.allergies}</ListItem>
                  <ListItem>Lifestyle: {patient.lifestyle}</ListItem>
                  <ListItem>Physical Activity: {patient.physicalActivity}</ListItem>
                </List>
              </Box>
              <Box>
                <Flex align="center" color="gray.600" mb={2}>
                  <Icon as={FaCapsules} mr={2} />
                  <Text fontWeight="bold">Current Medications:</Text>
                </Flex>
                <List spacing={1} color="#335d8f">
                  {patient.medications && patient.medications.length > 0 ? (
                    patient.medications.map((med, index) => (
                      <ListItem key={index}>{med}</ListItem>
                    ))
                  ) : (
                    <ListItem>No Medications</ListItem>
                  )}
                </List>
              </Box>
            </Stack>
          </Box>


          {/* Reminders & Appointments */}
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
          >
            <Heading fontSize="xl" color="#00366d" mb={4} textAlign="center">
              Reminders & Appointments
            </Heading>
            <List spacing={3} color="#335d8f">
              <ListItem>
                <Flex align="center">
                  <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                  <Badge color="#335d8f" mr={2}>
                    Oct 20, 2024
                  </Badge>
                  <Tooltip label="Add to Google Calendar" placement="top">
                    <Link
                      href="https://calendar.google.com/calendar/r/eventedit"
                      isExternal
                      color="#335d8f"
                      fontWeight="bold"
                      _hover={{ color: "#00366d" }}
                    >
                      General Checkup
                    </Link>
                  </Tooltip>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex align="center">
                  <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                  <Badge color="#335d8f" mr={2}>
                    Nov 1, 2024
                  </Badge>
                  <Tooltip label="Add to Google Calendar" placement="top">
                    <Link
                      href="https://calendar.google.com/calendar/r/eventedit"
                      isExternal
                      color="#335d8f"
                      fontWeight="bold"
                      _hover={{ color: "#00366d" }}
                    >
                      Blood Test Follow-up
                    </Link>
                  </Tooltip>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex align="center">
                  <Icon as={FaCalendarAlt} color="gray.600" mr={2} />
                  <Badge color="#335d8f" mr={2}>
                    Dec 5, 2024
                  </Badge>
                  <Tooltip label="Add to Google Calendar" placement="top">
                    <Link
                      href="https://calendar.google.com/calendar/r/eventedit"
                      isExternal
                      color="#335d8f"
                      fontWeight="bold"
                      _hover={{ color: "#00366d" }}
                    >
                      Vaccination
                    </Link>
                  </Tooltip>
                </Flex>
              </ListItem>
            </List>
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
            Upcoming Appointments
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
            Health Goals
          </Heading>
          <Box mb={6}>
            <Flex align="center">
              <Icon as={FaWalking} color="#00366d" mr={2} />
              <Text color="#00366d">Steps per Day: {stepsGoal}%</Text>
            </Flex>
            <Slider value={stepsGoal} onChange={setStepsGoal} min={0} max={100}>
              <SliderTrack bg="gray.200">
                <SliderFilledTrack bg="#00366d" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Box>
          <Box mb={6}>
            <Flex align="center">
              <Icon as={FaBed} color="blue.500" mr={2} />
              <Text color="#00366d">Hours of Sleep: {sleepGoal}%</Text>
            </Flex>
            <Slider value={sleepGoal} onChange={setSleepGoal} min={0} max={100}>
              <SliderTrack bg="gray.200">
                <SliderFilledTrack bg="blue.400" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </Box>
          <Box mb={6}>
            <Flex align="center">
              <Icon as={FaTint} color="cyan.500" mr={2} />
              <Text color="#00366d">Water Intake: {waterIntakeGoal}%</Text>
            </Flex>
            <Slider
              value={waterIntakeGoal}
              onChange={setWaterIntakeGoal}
              min={0}
              max={100}
            >
              <SliderTrack bg="gray.200">
                <SliderFilledTrack bg="cyan.400" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
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
            {patient.medications.length > 0 ? (
              patient.medications.map((med, index) => (
                <ListItem key={index}>{med}</ListItem>
              ))
            ) : (
              <ListItem>No Medications</ListItem>
            )}
          </List>
        </Box>

        {/* Update Profile Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type="file" onChange={handleImageUpload} />
              {/* <Input
                placeholder="Name"
                mb={4}
                name="name"
                value={newProfile.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Age"
                mb={4}
                name="age"
                value={newProfile.age}
                onChange={handleChange}
              />
              <Input
                placeholder="Address"
                mb={4}
                name="address"
                value={newProfile.address}
                onChange={handleChange}
              />
              <Input
                placeholder="Phone"
                mb={4}
                name="phone"
                value={newProfile.phone}
                onChange={handleChange}
              />
              <Input
                placeholder="Blood Pressure"
                mb={4}
                name="bloodPressure"
                value={newProfile.bloodPressure}
                onChange={handleChange}
              />
              <Input
                placeholder="Heart Rate"
                mb={4}
                name="heartRate"
                value={newProfile.heartRate}
                onChange={handleChange}
              />
              <Input
                placeholder="Blood Sugar Level"
                mb={4}
                name="bloodSugar"
                value={newProfile.bloodSugar}
                onChange={handleChange}
              /> */}
            </ModalBody>
            <ModalFooter>
              <Button color="#335d8f" mr={3} onClick={saveChanges}>
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
