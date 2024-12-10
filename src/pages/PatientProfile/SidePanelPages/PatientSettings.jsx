import {
  ChakraProvider,
  Box,
  Text,
  Spinner,
  useToast,
  Button,
  Heading,
  Input,
  Switch,
} from "@chakra-ui/react";
import { FaUserEdit, FaTrashAlt, FaKey, FaSave, FaBell } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

function PatientSettings() {
  const [patient, setPatient] = useState(null); // stores patient data, initially empty aka null
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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
          setLoading(false); // Stop loading even if user isn't logged in
          return;
        }

        const patientQuery = query(
          collection(db, "patients"),
          where("email", "==", user.email)
        );

        const patientSnapshot = await getDocs(patientQuery);

        if (!patientSnapshot.empty) {
          const patientDoc = patientSnapshot.docs[0];
          setPatient({ id: patientDoc.id, ...patientDoc.data() });

        //   console.log(patientDoc.data().firstName);
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

  if (loading) {
    // Display a spinner or loading message while fetching data
    return (
      <Box
        p={8}
        bg="gray.50"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!patient) {
    // Show this only after loading is complete and no patient data is found
    return (
      <Box
        p={8}
        bg="gray.50"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Text fontSize="lg" color="gray.600">
            No patient data available. Please make sure you are logged in with
            the correct account.
          </Text>
        </Box>
      </Box>
    );
  }

  const handlePasswordChange = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePatientDeletion = () => {
    toast({
      title: "Patient Deleted",
      description: "The patient's data has been permanently removed.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleNotificationSettings = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <Box
        p={8}
        bg="gray.50"
        minH="100vh"
        minWidth="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="#333"
        bgGradient="linear(to-br, blue.50, gray.50)" 
      >
        <Box
          className="settings-page"
        //   minWidth="78%"
          mx="auto"
          p={6}
          pt={10}
          mt={4}
          backgroundColor="rgba(255, 255, 255, 0.6)"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          borderRadius="xl"
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
        >
          <Heading as="h1" textAlign="center" mb={6} color="#00366d">
            Doctor Settings
          </Heading>

          {/* Update Profile Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#335d8f">
              Update Profile
            </Heading>
            <Input
              type="text"
              placeholder="Enter full name"
              mb={4}
              focusBorderColor="#4d7098"
            />
            <Input
              type="email"
              placeholder="Enter email address"
              mb={4}
              focusBorderColor="#4d7098"
            />
            <Button
              leftIcon={<FaUserEdit />}
              width="full"
              _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              onClick={handleProfileUpdate}
            >
              Update Profile
            </Button>
          </Box>

          {/* Change Password Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#335d8f">
              Change Password
            </Heading>
            <Input
              type="password"
              placeholder="Enter new password"
              mb={4}
              focusBorderColor="#4d7098"
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              mb={4}
              focusBorderColor="#4d7098"
            />
            <Button
              leftIcon={<FaKey />}
              width="full"
              _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </Box>

          {/* Delete Patient Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#335d8f">
              Delete Patient
            </Heading>
            <Input
              type="text"
              placeholder="Enter patient ID"
              mb={4}
              focusBorderColor="#4d7098"
            />
            <Button
              leftIcon={<FaTrashAlt />}
              colorScheme="red"
              variant="solid"
              width="full"
              _hover={{ bg: "red" }}
              onClick={handlePatientDeletion}
            >
              Delete Patient
            </Button>
          </Box>

          {/* Notification Settings */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#335d8f">
              Notification Settings
            </Heading>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={4}
            >
              <span>Email Notifications</span>
              <Switch color="#335d8f" />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={4}
            >
              <span>SMS Notifications</span>
              <Switch color="#335d8f" />
            </Box>
            <Button
              leftIcon={<FaBell />}
              width="full"
              _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              onClick={handleNotificationSettings}
            >
              Save Notification Preferences
            </Button>
          </Box>

          {/* Save All Changes */}
          <Box textAlign="center">
            <Button
              leftIcon={<FaSave />}
              width="full"
              _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              size="lg"
              onClick={() =>
                toast({
                  title: "Settings Saved",
                  description: "All your changes have been saved successfully.",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                })
              }
            >
              Save All Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default PatientSettings;
