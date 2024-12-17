// Contact.jsx

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
  Link,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaPhoneAlt, FaEnvelope, FaInfoCircle, FaUserMd, FaUser } from "react-icons/fa";
import Footer from "./Footer"; // Footer component
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.inquiryType || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    const emailSubject = `${formData.inquiryType} - ${formData.name}`;
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:${getEmailAddress(formData.inquiryType)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
    setLoading(false);

    toast({
      title: "Success",
      description: "We've opened your email client to send the message.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setFormData({ name: "", email: "", inquiryType: "", message: "" });
  };

  const getEmailAddress = (inquiryType) => {
    switch (inquiryType) {
      case "General Inquiry":
        return "contact.patientpriority@gmail.com";
      case "Patient Support":
        return "hr.patientpriority@gmail.com";
      case "Doctor Support":
        return "hr.patientpriority@gmail.com";
      default:
        return "contact.patientpriority@gmail.com";
    }
  };

  return (
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
      <Box height="100px" />

      {/* Header Section */}
      <Heading fontSize="6xl" color="#00366d" mb={4} textAlign="center">
        Contact Us
      </Heading>
      <Text fontSize="2xl" color="#00366d" textAlign="center" mb={12} maxW="80%">
        Select your inquiry type and reach out to us directly.
      </Text>

      {/* Contact Form */}
      <VStack
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
        <FormControl>
          <FormLabel color="#00366d" fontSize="lg">Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            borderColor="#00366d"
            focusBorderColor="highlight"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="#00366d" fontSize="lg">Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            borderColor="secondary"
            focusBorderColor="highlight"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="#00366d" fontSize="lg">Inquiry Type</FormLabel>
          <Select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            placeholder="Select inquiry type"
            borderColor="secondary"
            focusBorderColor="highlight"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Patient Support">Patient Support</option>
            <option value="Doctor Support">Doctor Support</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel color="#00366d" fontSize="lg">Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here"
            borderColor="secondary"
            focusBorderColor="highlight"
          />
        </FormControl>

        <Divider borderColor="secondary" />

        <Button
          type="submit"
          backgroundColor="#003366"  // Dark navy blue background color
          color="white"  // White text color
          _hover={{ backgroundColor: "#002244" }}  // Darker hover color
          size="lg"
          width="full"
          isLoading={loading}
          fontSize="lg"
        >
          Send Message
        </Button>
      </VStack>

      {/* Additional Contact Information */}
      <VStack mt={8} spacing={6} align="center" width={{ base: "90%", md: "70%", lg: "50%" }}>
        <Text fontSize="2xl" color="#00366d" fontWeight="bold">
          Additional Contact Information
        </Text>
        <Box
          backgroundColor="white"
          borderRadius="md"
          p={6}
          boxShadow="lg"
          width="100%"
          opacity={0.95}
        >
          <HStack spacing={4} align="center" mb={4}>
            <Icon as={FaInfoCircle} boxSize="2em" color="#00366d" />
            <Heading fontSize="xl" color="#00366d">
              General Inquiries
            </Heading>
          </HStack>
          <Text fontSize="lg" color="secondary">
            <Link href="mailto:contact.patientpriority@gmail.com" color="#00366d" fontWeight="bold" isExternal>
              contact.patientpriority@gmail.com
            </Link>
          </Text>
          <Text fontSize="lg" color="secondary">
            <Icon as={FaPhoneAlt} mr={2} /> (347) 264-9232
          </Text>

          <Divider my={4} />

          <HStack spacing={4} align="center" mb={4}>
            <Icon as={FaUser} boxSize="2em" color="#00366d" />
            <Heading fontSize="xl" color="#00366d">
              Patient Support
            </Heading>
          </HStack>
          <Text fontSize="lg" color="secondary">
            <Link href="mailto:hr.patientpriority@gmail.com" color="#00366d" fontWeight="bold" isExternal>
              hr.patientpriority@gmail.com
            </Link>
          </Text>
          <Text fontSize="lg" color="secondary">
            <Icon as={FaPhoneAlt} mr={2} /> (929) 235-4770
          </Text>

          <Divider my={4} />

          <HStack spacing={4} align="center" mb={4}>
            <Icon as={FaUserMd} boxSize="2em" color="#00366d" />
            <Heading fontSize="xl" color="#00366d">
              Doctor Support
            </Heading>
          </HStack>
          <Text fontSize="lg" color="secondary">
            <Link href="mailto:hr.patientpriority@gmail.com" color="#00366d" fontWeight="bold" isExternal>
              hr.patientpriority@gmail.com
            </Link>
          </Text>
          <Text fontSize="lg" color="secondary">
            <Icon as={FaPhoneAlt} mr={2} /> (929) 235-4770
          </Text>
        </Box>
      </VStack>

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
      
      <Footer />
    </Box>
  );
};

export default Contact;