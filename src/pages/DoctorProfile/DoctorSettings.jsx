import React from "react";
import { useAuth } from "../../Context/AuthContext.jsx";
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  Input,
  Switch,
  Select,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import {
  FaUserEdit,
  FaTrashAlt,
  FaKey,
  FaSave,
  FaBell,
} from "react-icons/fa";
//import "./Home.css"; // Reuse the CSS for consistent styling
import { useNavigate } from "react-router-dom";

const theme = extendTheme({
  fonts: {
    heading: "Sansation, sans-serif",
    body: "Sansation, sans-serif",
  },
});

const Settings = () => {
  const toast = useToast();

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
    <ChakraProvider theme={theme}>
      <Box pt={20} /* Adjust to match navbar height */></Box>
      <Box
        className="settings-page"
        maxW="800px"
        mx="auto"
        p={6}
        pt={10}
        mt={4}
        backgroundColor="rgba(255, 255, 255, 0.6)"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        borderRadius="md"
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
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
            <span>Email Notifications</span>
            <Switch color="#335d8f" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
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
    </ChakraProvider>
  );
};

export default Settings;
