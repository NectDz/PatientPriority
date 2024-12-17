// Updated Support.jsx
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
import Footer from "./Footer"; // Footer component
import { useNavigate } from "react-router-dom"; // Import navigate function

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
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    //setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5175/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your request. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
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
        backgroundColor="#f1f8ff"
        backgroundImage="url('https://static.vecteezy.com/system/resources/previews/015/309/491/non_2x/heart-rate-pulse-free-png.png')" // Replace with your image path
      backgroundSize="175px" // Ensures the image covers the entire area
      backgroundPosition="center" // Centers the image
      backgroundRepeat="no-repeat" // Prevents repeating the image
      backgroundAttachment="fixed" // Keeps the image fixed during scroll
      >
        <Heading fontSize="6xl" color="#00366d" mb={4} mt={8} textAlign="center">
          Support
        </Heading>
        <Box
          as="form"
          width={{ base: "90%", md: "500px" }}
          p="8"
          backgroundColor="white"
          borderRadius="md"
          opacity={0.9}
          onSubmit={handleSubmit}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
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
            color="#7f8ba0"
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
            type="submit"
            isLoading={isSubmitting}
            width="full"
            _hover={{ bg: "#4d7098" }}
            color="#f1f8ff"
            bg="#335d8f"
          >
            Submit
          </Button>
        </Box>

        {/* Back Button */}
        <Button
          mt={8}
          mb={8}
          colorScheme="teal"
          onClick={() => navigate("/home")}
          bg="#335d8f"
          color="white"
          size="md"
          borderColor="#f1f8ff"
          borderWidth="2px"
          _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
          transition="all 0.3s"
        >
          Back to Home
        </Button>
      </Box>
      <Footer />
    </ChakraProvider>
  );
};

export default Support;