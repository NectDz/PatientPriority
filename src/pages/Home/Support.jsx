// Support.jsx

import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Sansation, sans-serif",
    body: "Sansation, sans-serif",
  },
});

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Support Request Submitted",
        description: "Our support team will get back to you shortly.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        name: "",
        email: "",
        issueType: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        p={8}
        backgroundColor="#EFF8F8"
      >
        <Heading fontSize="4xl" color="#00366d" mb="8">
          Support
        </Heading>
        <Box
          as="form"
          width={{ base: "90%", md: "500px" }}
          p="8"
          backgroundColor="white"
          boxShadow="lg"
          borderRadius="md"
          onSubmit={handleSubmit}
        >
          <Text fontSize="lg" color="#00366d" mb="4">
            Please fill out the form below, and our support team will contact you shortly.
          </Text>
          <Input
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            mb="4"
            required
          />
          <Input
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            mb="4"
            required
          />
          <Select
            placeholder="Select Issue Type"
            name="issueType"
            value={formData.issueType}
            onChange={handleInputChange}
            mb="4"
            required
          >
            <option value="login">Login Issues</option>
            <option value="account">Account Management</option>
            <option value="appointment">Appointment Scheduling</option>
            <option value="other">Other</option>
          </Select>
          <Textarea
            placeholder="Describe your issue here..."
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            mb="4"
            required
          />
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={isSubmitting}
            width="full"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Support;
