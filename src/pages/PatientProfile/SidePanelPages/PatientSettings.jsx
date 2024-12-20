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
  Grid,
  useBreakpointValue,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  FaUserEdit,
  FaTrashAlt,
  FaKey,
  FaSave,
  FaBell,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
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

function PatientSettings() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [docID, setDocID] = useState(null); //document ID

  // state for managing password input
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Refs for profile editing
  const profileRefs = {
    phone: useRef(),
    emergencyContactName: useRef(),
    emergencyContactEmail: useRef(),
    emergencyContactPhone: useRef(),
    emergencyContactRelationship: useRef(),
    addressCity: useRef(),
    addressState: useRef(),
    addressStreet: useRef(),
    addressZip: useRef(),
    insuranceProvider: useRef(),
  };

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

          setDocID(patientDoc.id);
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

  const handleStartEditing = () => {
    setIsEditing(true);
    // Set initial values for editing
    if (patient) {
      Object.keys(profileRefs).forEach((key) => {
        if (profileRefs[key].current) {
          if (key.startsWith("emergencyContact")) {
            const refKey = key.replace("emergencyContact", "").toLowerCase();
            profileRefs[key].current.value =
              patient.emergencyContact?.[refKey] || "";
          } else {
            profileRefs[key].current.value = patient[key] || "";
          }

          if (key.startsWith("address")) {
            const refKey = key.replace("address", "").toLowerCase();
            profileRefs[key].current.value = patient.address?.[refKey] || "";
          } else {
            profileRefs[key].current.value = patient[key] || "";
          }
        }
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Prepare the update object
      const updateData = {
        phone: profileRefs.phone.current?.value || patient.phone,
        insuranceProvider:
          profileRefs.insuranceProvider.current?.value ||
          patient.insuranceProvider,
        emergencyContact: {
          name:
            profileRefs.emergencyContactName.current?.value ||
            patient.emergencyContact?.name,
          email:
            profileRefs.emergencyContactEmail.current?.value ||
            patient.emergencyContact?.email,
          phone:
            profileRefs.emergencyContactPhone.current?.value ||
            patient.emergencyContact?.phone,
          relationship:
            profileRefs.emergencyContactRelationship.current?.value ||
            patient.emergencyContact?.relationship,
        },
        address: {
          city: profileRefs.addressCity.current?.value || patient.address?.city,
          state:
            profileRefs.addressState.current?.value || patient.address?.state,
          street:
            profileRefs.addressStreet.current?.value || patient.address?.street,
          zip: profileRefs.addressZip.current?.value || patient.address?.zip,
        },
      };

      //   console.log("Update Data:", updateData);

      // Update Firestore document
      await updateDoc(doc(db, "patients", docID), updateData);

      // Update local state
      setPatient((prev) => ({
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
  const toggleCurrentPasswordVisibility = () =>
    setShowCurrentPassword(!showCurrentPassword);

  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);

  const handlePatientDeletion = () => {
    toast({
      title: "Patient Deleted",
      description: "The patient's data has been permanently removed.",
      status: "error",
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
        minH="100%"
        minWidth="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
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

            {/* Patient Details */}
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
                  <Text>{patient.firstName + " " + patient.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Email:
                  </Text>
                  <Text>{patient.email}</Text>
                </Box>
                <FormControl>
                  <FormLabel fontWeight="bold" color="gray.700">
                    Phone Number
                  </FormLabel>
                  <Input ref={profileRefs.phone} defaultValue={patient.phone} />
                </FormControl>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Date Of Birth:
                  </Text>
                  <Text>{patient.dob || "Not Provided"}</Text>
                </Box>
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
                  <Text>{patient.firstName + " " + patient.lastName}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Email:
                  </Text>
                  <Text>{patient.email}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Phone Number:
                  </Text>
                  <Text>{patient.phone || "Not Provided"}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700">
                    Date Of Birth:
                  </Text>
                  <Text>{patient.dob || "Not Provided"}</Text>
                </Box>
              </Grid>
            )}

            {/* Emergency Contact Details */}
            <Box
              mb={6}
              p={4}
              bg="gray.50"
              rounded="md"
              shadow="sm"
              wordBreak="break-word"
            >
              <Heading as="h3" fontSize="lg" mb={4} color="#4d7098">
                Emergency Contact
              </Heading>
              {isEditing ? (
                <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap={4}>
                  <FormControl>
                    <FormLabel> Full Name: </FormLabel>
                    <Input
                      ref={profileRefs.emergencyContactName}
                      defaultValue={patient.emergencyContact?.name}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email:</FormLabel>
                    <Input
                      ref={profileRefs.emergencyContactEmail}
                      defaultValue={patient.emergencyContact?.email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone:</FormLabel>
                    <Input
                      ref={profileRefs.emergencyContactPhone}
                      defaultValue={patient.emergencyContact?.phone}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Relationship to Patient:</FormLabel>
                    <Select
                      name="relationship"
                      defaultValue={patient.emergencyContact?.relationship}
                      ref={profileRefs.emergencyContactRelationship}
                    >
                      <option value="mother">Mother</option>
                      <option value="father">Father</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap={4}>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Name:
                    </Text>
                    <Text>
                      {patient.emergencyContact?.name || "Not Provided"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Email:
                    </Text>
                    <Text>
                      {patient.emergencyContact?.email || "Not Provided"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Phone:
                    </Text>
                    <Text>
                      {patient.emergencyContact?.phone || "Not Provided"}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Relationship:
                    </Text>
                    <Text>
                      {patient.emergencyContact?.relationship || "Not Provided"}
                    </Text>
                  </Box>
                </Grid>
              )}
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" mb={4} color="#4d7098">
                Address
              </Heading>
              {isEditing ? (
                <Grid
                  templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                  gap={4}
                  mb={6}
                >
                  <FormControl>
                    <FormLabel fontWeight="bold" color="gray.700">
                      Street:
                    </FormLabel>
                    <Input
                      ref={profileRefs.addressStreet}
                      defaultValue={patient.address.street}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" color="gray.700">
                      City:
                    </FormLabel>
                    <Input
                      ref={profileRefs.addressCity}
                      defaultValue={patient.address.city}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" color="gray.700">
                      State:
                    </FormLabel>
                    <Input
                      ref={profileRefs.addressState}
                      defaultValue={patient.address.state}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="bold" color="gray.700">
                      Zip:
                    </FormLabel>
                    <Input
                      ref={profileRefs.addressZip}
                      defaultValue={patient.address.zip}
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
                      Street:
                    </Text>
                    <Text>{patient.address.street}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      City:
                    </Text>
                    <Text>{patient.address.city}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      State:
                    </Text>
                    <Text>{patient.address.state}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Zip:
                    </Text>
                    <Text>{patient.address.zip}</Text>
                  </Box>
                </Grid>
              )}
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" mb={4} color="#4d7098">
                Insurance
              </Heading>

              {isEditing ? (
                <Grid
                  templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                  gap={4}
                  mb={6}
                >
                  <Box>
                    <FormControl>
                      <FormLabel fontWeight="bold" color="gray.700">
                        Provider:
                      </FormLabel>
                      <Input
                        ref={profileRefs.insuranceProvider}
                        defaultValue={patient.insuranceProvider}
                      />
                    </FormControl>
                  </Box>
                </Grid>
              ) : (
                <Grid
                  templateColumns={isMobile ? "1fr" : "1fr 1fr"}
                  gap={4}
                  mb={6}
                >
                  <Box>
                    <Text fontWeight="bold" color="gray.700">
                      Provider:
                    </Text>
                    <Text>{patient.insuranceProvider}</Text>
                  </Box>
                </Grid>
              )}
            </Box>

            {/* Update Button */}

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
            <Heading as="h3" fontSize="lg" mb={4} color="#4d7098">
              Change Password
            </Heading>
            <Grid templateColumns={isMobile ? "1fr" : "1fr 1fr"} gap={4} mb={4}>
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
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </Box>

          {/* Delete Patient Section */}
          <Box mb={8}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#335d8f">
              Reveal Patient ID
            </Heading>
            <Button
              leftIcon={<FaEye />}
              colorScheme="blue"
              variant="solid"
              width="full"
              _hover={{ bg: "blue.600" }}
              onClick={() => {
                if (patient && patient.id) {
                  toast({
                    title: "Patient ID",
                    description: `Your Patient ID is: ${patient.id}`,
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Error",
                    description: "Patient ID could not be retrieved.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Reveal ID
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
              onClick={handleNotificationSettings}
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
}

export default PatientSettings;
