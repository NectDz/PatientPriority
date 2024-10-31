import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../Context/AuthContext";

const DoctorSettings = () => {
  const { user, updatePassword, updateLicense } = useAuth(); // Assuming these methods exist in AuthContext
  const toast = useToast();

  // State variables for password and license update
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [license, setLicense] = useState(user.license || ""); // Default to current license if available
  const [loading, setLoading] = useState(false);

  // Handle password change
  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure the passwords match.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password);
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to update password",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle license update
  const handleLicenseUpdate = async () => {
    setLoading(true);
    try {
      await updateLicense(license);
      toast({
        title: "License Updated",
        description: "Your license information has been successfully updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to update license",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="#EFF8F8" color="#0B2545" minHeight="100vh" padding={8}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Doctor Settings
      </Heading>
      <Box
        maxWidth="600px"
        margin="0 auto"
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
      >
        <VStack spacing={6} align="stretch">
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={user.email} isReadOnly bg="#E2E8F0" />
          </FormControl>

          <Divider />

          {/* Change Password Section */}
          <Heading as="h2" size="md">
            Change Password
          </Heading>
          <FormControl id="password">
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            width="full"
            onClick={handlePasswordChange}
            isLoading={loading}
          >
            Update Password
          </Button>

          <Divider />

          {/* Update License Section */}
          <Heading as="h2" size="md">
            Update License
          </Heading>
          <FormControl id="license">
            <FormLabel>License Number</FormLabel>
            <Input
              type="text"
              placeholder="Enter new license number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            width="full"
            onClick={handleLicenseUpdate}
            isLoading={loading}
          >
            Update License
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default DoctorSettings;
