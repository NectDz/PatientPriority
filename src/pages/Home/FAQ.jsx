import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Icon,
  Stack,
  useTheme,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Footer component
import {
  FaInfoCircle,
  FaPhoneAlt,
  FaStethoscope,
  FaUserCircle,
  FaShareAlt,
  FaShieldAlt,
  FaHeartbeat,
  FaLifeRing,
  FaExclamationTriangle,
  FaHospital,
  FaEnvelope,
} from "react-icons/fa";

const faqData = [
  {
    question: "What is Patient Priority?",
    answer:
      "Patient Priority is a next-generation healthcare platform designed to enhance communication and streamline interactions between doctors and patients. Our AI-driven tools support scheduling, transcription, personalized health insights, and more — empowering both patients and healthcare providers to focus on what truly matters: better health outcomes.",
    icon: FaInfoCircle,
    iconColor: "primary",
  },
  {
    question: "How do I book an appointment with my doctor?",
    answer:
      "Patients schedule appointments as usual by calling their doctor's office. The receptionist will confirm the date and time, and the appointment will then be reflected on the patient’s side of the platform for easy tracking and reminders.",
    icon: FaPhoneAlt,
    iconColor: "highlight",
  },
  {
    question: "What features are available for doctors?",
    answer:
      "Doctors can leverage the Doctor Portal, which provides a dashboard to manage daily tasks, secure tools for uploading meeting notes, AI-powered transcription of patient conversations & streamlined patient profile management. These features simplify workflows and enhance care delivery.",
    icon: FaStethoscope,
    iconColor: "secondary",
  },
  {
    question: "What is included in the patient dashboard?",
    answer:
      "Patients have access to a personalized dashboard where they can track appointments, prescriptions, and health history, receive health reminders and AI-driven wellness insights while also being able to manage and update their profile in one convenient space.",
    icon: FaUserCircle,
    iconColor: "accent",
  },
  {
    question: "How secure is Patient Priority?",
    answer:
      "Your privacy and data security are our top priorities. We use encrypted storage and comply with healthcare regulations like HIPAA to ensure your information remains confidential. Our OAuth login system adds an extra layer of security, offering seamless and safe access.",
    icon: FaShieldAlt,
    iconColor: "primary",
  },
  {
    question: "Does Patient Priority offer personalized health recommendations?",
    answer:
      "Absolutely. Our AI analyzes patient profiles to provide tailored health tips, reminders, and proactive wellness suggestions—helping you stay ahead of potential health issues.",
    icon: FaHeartbeat,
    iconColor: "highlight",
  },
  {
    question: "How do I invite my doctor/hospital to join Patient Priority?",
    answer:
      "If your doctor isn't on Patient Priority yet, let them know about our platform! They can visit our website to learn more and sign up.",
    icon: FaShareAlt,
    iconColor: "primary",
  },
  {
    question: "How does the sign-up and account creation process work for doctors and patients?",
    answer:
      "The sign-up process begins when a hospital registers with Patient Priority and provides a doctor with login credentials. The doctor then creates an account using their first name, last name, hospital name, and credentials. Afterward, the doctor can add a patient from their side, and a verification code is emailed to the patient. The patient uses this code, along with their first name, last name, and email, to complete the sign-up process. Both doctors and patients will log in using their email and password once their accounts are created.",
    icon: FaHospital,
    iconColor: "primary",
  },  
  {
    question: "What should I do if I’m having trouble using the platform?",
    answer:
      "If you encounter any issues, our support team is here to help. Visit the “Support” section on our website or email us at contact.patientpriority@gmail.com for assistance.",
    icon: FaLifeRing,
    iconColor: "secondary",
  },
  {
    question: "What should I do in case of an emergency?",
    answer:
      "Patient Priority is designed for non-urgent healthcare needs. If you have a medical emergency, please contact emergency services or go to the nearest emergency room immediately.",
    icon: FaExclamationTriangle,
    iconColor: "accent",
  },
  {
    question: "Looking for something else?",
    answer:
      "Email us at contact.patientpriority@gmail.com",
    icon: FaEnvelope,
    iconColor: "secondary",
  },
];

const FAQ = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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

      <Heading fontSize="6xl" color="#00366d" mb={4} textAlign="center">
        FAQ
      </Heading>
      <Text fontSize="2xl" color="#335d8f" textAlign="center" mb={12} maxW="80%">
        Frequently Asked Questions
      </Text>

      <VStack spacing={8} align="stretch" width={{ base: "90%", md: "70%", lg: "60%" }} mx="auto">
        {faqData.map((faq, index) => (
          <Box 
            key={index} 
            backgroundColor="rgba(255, 255, 255, 0.9)"
            borderRadius="md" 
            p={8} 
            boxShadow="lg"
            transition="transform 0.6s ease, box-shadow 0.6s ease"
            _hover={{ transform: "scale(1.1)", boxShadow: "xl" }} 
          >
            <Stack direction="row" align="center" spacing={4} mb={4}>
              <Icon as={faq.icon} boxSize="1.5em" color="#00366d" />
              <Heading fontSize="xl" color="#00366d">
                {faq.question}
              </Heading>
            </Stack>
            <Divider mb={4} borderColor="#00366d" />
            <Text fontSize="lg" color="#335d8f" lineHeight="1.7">
              {faq.answer}
            </Text>
          </Box>
        ))}
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
        //_hover={{ bg: "#4d7098" }}
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

export default FAQ;