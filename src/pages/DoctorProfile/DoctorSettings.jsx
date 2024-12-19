import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  Input,
  Switch,
  Select,
  useToast,
  Spinner,
  Flex,
  IconButton,
  Grid,
  useBreakpointValue,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  FaUserEdit,
  FaTrashAlt,
  FaKey,
  FaSave,
  FaBell,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import React, { useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

const DoctorSettings = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [docID, setDocID] = useState(null); //document ID
  const [patientID, setPatientID] = useState(""); // State for patient ID input
  const [newPatientID, setNewPatientID] = useState(""); // State for the patient ID to be added

  // state for managing password input
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Refs for profile editing
  const profileRefs = {
    hospital: useRef(),
    department: useRef(),
  };

  useEffect(() => {
    const fetchDoctor = async () => {
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

        const doctorQuery = query(
          collection(db, "doctor"),
          where("email", "==", user.email)
        );

        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorDoc = doctorSnapshot.docs[0];
          setDoctor({ id: doctorDoc.id, ...doctorDoc.data() });

          setDocID(doctorDoc.id);
          //   console.log("Document ID:", patientDoc.id);
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

    fetchDoctor();
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
  if (!doctor) {
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
            No doctor data available. Please make sure you are logged in with
            the correct account.
          </Text>
        </Box>
      </Box>
    );
  }

  const handleStartEditing = () => {
    setIsEditing(true);
    // Set initial values for editing
    if (doctor) {
      Object.keys(profileRefs).forEach((key) => {
        // if (profileRefs[key].current) {
        //   if (key.startsWith("emergencyContact")) {
        //     const refKey = key.replace("emergencyContact", "").toLowerCase();
        //     profileRefs[key].current.value =
        //       patient.emergencyContact?.[refKey] || "";
        //   } else {
        //     profileRefs[key].current.value = patient[key] || "";
        //   }
        //   if (key.startsWith("address")) {
        //     const refKey = key.replace("address", "").toLowerCase();
        //     profileRefs[key].current.value = patient.address?.[refKey] || "";
        //   } else {
        //     profileRefs[key].current.value = patient[key] || "";
        //   }
        // }
      });
    }
  };
  const handleSaveProfile = async () => {
    try {
      // Prepare the update object
      const updateData = {
        hospitalName:
          profileRefs.hospital.current?.value || doctor.hospitalName,
        department: profileRefs.department.current?.value || doctor.department,
      };

      //   console.log("Update Data:", updateData);

      // Update Firestore document
      await updateDoc(doc(db, "doctor", docID), updateData);

      // Update local state
      setDoctor((prev) => ({
        ...prev,
        ...updateData,
      }));

      // Exit editing mode
      setIsEditing(false);

      // Show success toast
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // console.error("Full error details:", error);
      // console.error("Error name:", error.name);
      // console.error("Error message:", error.message);
      // console.error("Error stack:", error.stack);

      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile information.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);

  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);

  const handlePasswordChange = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is logged in.");
      }

      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      // Reset the password fields
      setNewPassword("");
      setCurrentPassword("");

      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description: "Failed to update password." || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePatientDeletion = async () => {
    if (!patientID) {
      toast({
        title: "Input Required",
        description: "Please enter a patient ID.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Query to find the patient where the 'id' field matches patientID
      const patientQuery = query(
        collection(db, "patients"),
        where("id", "==", patientID) // Match the 'id' field in the document
      );
      const patientSnapshot = await getDocs(patientQuery);

      if (patientSnapshot.empty) {
        toast({
          title: "Patient Not Found",
          description: "No patient found with the provided ID.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Get the first matching document
      const patientDoc = patientSnapshot.docs[0];

      // Retrieve the document data
      const patientData = patientDoc.data();

      // Check if the patient is associated with the current doctor
      if (patientData.doctor_id !== doctor.id) {
        toast({
          title: "Action Forbidden",
          description:
            "This patient is not associated with your account or has already been removed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Update the 'doctor_id' field to an empty string using the correct reference
      await updateDoc(patientDoc.ref, { doctor_id: "" });

      toast({
        title: "Patient Removed",
        description:
          "The patient has been successfully removed from your list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error removing patient:", error);
      toast({
        title: "Error",
        description: "Failed to remove the patient.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddPatient = async () => {
    if (!newPatientID) {
      toast({
        title: "Input Required",
        description: "Please enter a patient ID.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Query to find the patient where the 'id' field matches newPatientID
      const patientQuery = query(
        collection(db, "patients"),
        where("id", "==", newPatientID) // Match the 'id' field in the document
      );
      const patientSnapshot = await getDocs(patientQuery);

      if (patientSnapshot.empty) {
        toast({
          title: "Patient Not Found",
          description: "No patient found with the provided ID.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Get the first matching document
      const patientDoc = patientSnapshot.docs[0];
      const patientData = patientDoc.data();

      // Check if the patient is already associated with a doctor
      if (patientData.doctor_id) {
        toast({
          title: "Action Forbidden",
          description:
            "This patient is already associated with a doctor.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Update the 'doctor_id' field to the current doctor's ID
      await updateDoc(patientDoc.ref, { doctor_id: doctor.id });

      toast({
        title: "Patient Added",
        description: "The patient has been successfully added to your list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setNewPatientID(""); // Clear the input field
    } catch (error) {
      console.error("Error adding patient:", error);
      toast({
        title: "Error",
        description: "Failed to add the patient.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
        minH="100%"
        minWidth="100%"
        display="flex"
        justifyContent="center"
        // alignItems="center"
        color="#333"
        bgGradient="linear(to-br, blue.50, gray.50)"
      >
        <Box
          className="settings-page"
          mx="auto"
          p={6}
          pt={10}
          mt={4}
          backgroundColor="rgba(255, 255, 255, 0.6)"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          borderRadius="xl"
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
          minWidth="40%"
        >
          <Heading as="h1" mb={6} color="#00366d">
            Settings
          </Heading>

          {/* Update Profile Section */}
          <Box mb={8}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading as="h2" fontSize="2xl" color="#335d8f">
                Profile
              </Heading>
              {isEditing ? (
                <Box>
                  <IconButton
                    icon={<CheckIcon />}
                    colorScheme="green"
                    size="sm"
                    mr={2}
                    onClick={handleSaveProfile}
                    aria-label="Save"
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                    aria-label="Cancel"
                  />
                </Box>
              ) : null}
            </Flex>

            {isEditing ? (
              <Grid
                templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                gap={4}
                mb={6}
              >
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Full Name:
                  </Text>
                  <Text>{doctor.firstName + " " + doctor.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Email:
                  </Text>
                  <Text>{doctor.email}</Text>
                </Box>
                <FormControl>
                  <FormLabel fontWeight="bold" color="gray.700">
                    Hospital
                  </FormLabel>
                  <Input
                    ref={profileRefs.hospital}
                    defaultValue={doctor.hospitalName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="bold" color="gray.700">
                    Department
                  </FormLabel>
                  <Input
                    ref={profileRefs.department}
                    defaultValue={doctor.department}
                  />
                </FormControl>
              </Grid>
            ) : (
              <Grid
                templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                gap={4}
                mb={6}
              >
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Full Name:
                  </Text>
                  <Text>{doctor.firstName + " " + doctor.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Email:
                  </Text>
                  <Text>{doctor.email}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Hospital:
                  </Text>
                  <Text>{doctor.hospitalName || "Not Provided"}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Department:
                  </Text>
                  <Text>{doctor.department || "Not Provided"}</Text>
                </Box>
              </Grid>
            )}

            <Button
              leftIcon={<FaUserEdit />}
              width="full"
              _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              onClick={handleStartEditing}
            >
              Update Profile
            </Button>
          </Box>

          {/* Change Password Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" color="#335d8f">
              Change Password
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {/* Current Password */}
              <FormControl>
                <FormLabel>Current Password:</FormLabel>
                <InputGroup>
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      aria-label="Toggle Current Password Visibility"
                      icon={showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                      onClick={toggleCurrentPasswordVisibility}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* New Password */}
              <FormControl>
                <FormLabel>New Password:</FormLabel>
                <InputGroup>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      aria-label="Toggle New Password Visibility"
                      icon={showNewPassword ? <FaEye /> : <FaEyeSlash />}
                      onClick={toggleNewPasswordVisibility}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Grid>

            <Button
              leftIcon={<FaKey />}
              width="full"
              _hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              mt={4}
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </Box>

          {/* Existing Patient Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" color="#335d8f">
              Add An Existing Patient
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Patient ID:</FormLabel>
              <Input
                type="text"
                placeholder="Enter patient ID"
                value={newPatientID}
                onChange={(e) => setNewPatientID(e.target.value)}
                focusBorderColor="#4d7098"
              />
            </FormControl>
            <Button
              leftIcon={<FaSave />}
              colorScheme="teal"
              variant="solid"
              width="full"
              _hover={{ bg: "teal.600" }}
              onClick={handleAddPatient}
            >
              Add Patient
            </Button>
          </Box>

          {/* Delete Patient Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" color="#335d8f">
              Remove Patient
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Patient ID:</FormLabel>
              <Input
                type="text"
                placeholder="Enter patient ID"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                focusBorderColor="#4d7098"
              />
            </FormControl>
            <Button
              leftIcon={<FaTrashAlt />}
              colorScheme="red"
              variant="solid"
              width="full"
              _hover={{ bg: "red.600" }}
              onClick={handlePatientDeletion}
            >
              Remove
            </Button>
          </Box>

          {/* Notification Settings */}
          {/* <Box mb={8}>
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
              // onClick={handleNotificationSettings}
            >
              Save Notification Preferences
            </Button>
          </Box> */}

          {/* Save All Changes */}
          {/* <Box textAlign="center">
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
        </Box> */}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default DoctorSettings;
