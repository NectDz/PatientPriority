// AboutUs.jsx

import React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  extendTheme,
  HStack,
  Icon,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaChartLine, FaLightbulb, FaUserShield } from "react-icons/fa";
import Footer from "./Footer"; // Footer component

const theme = extendTheme({
  fonts: {
    heading: "Sansation, sans-serif",
    body: "Sansation, sans-serif",
  },
  colors: {
    primary: "#00366d",
    secondary: "#00366d",
    highlight: "#ff5c5c",
    background: "#f1f8ff",
    accent: "#4d7098",
  },
});

const StatBox = ({ icon, stat, label }) => (
  <Box
  p={4}
  opacity={0.9}
  backgroundColor="white"
  boxShadow="md"
  borderRadius="md"
  textAlign="center"
  width={{ base: "100%", md: "250px" }}
  transition="all 0.3s ease"
  height="200px"
  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
>
  <Icon as={icon} boxSize="2em" color="primary" mb={2} />
  <Text fontSize="4xl" fontWeight="bold" color="primary">
    {stat}
  </Text>
  <Text color="primary" fontSize="lg">
    {label}
  </Text>
</Box>
);

const AboutUs = () => {
  const navigate = useNavigate(); // Hook for navigation
  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        p={8}
        backgroundColor="background"
        backgroundImage="url('https://static.vecteezy.com/system/resources/previews/015/309/491/non_2x/heart-rate-pulse-free-png.png')" // Replace with your image path
      backgroundSize="175px" // Ensures the image covers the entire area
      backgroundPosition="center" // Centers the image
      backgroundRepeat="no-repeat" // Prevents repeating the image
      backgroundAttachment="fixed" // Keeps the image fixed during scroll
      >
        {/* Spacing to push content below the navbar */}
        <Box height="100px" />

        {/* Header Section */}
        <Heading fontSize="6xl" color="primary" mb={4} textAlign="center">
          About Patient Priority
        </Heading>
        <Text fontSize="2xl" color="secondary" textAlign="center" mb={12} maxW="80%">
          Revolutionizing healthcare by enhancing communication, proactive care, and personalized insights.
        </Text>

        {/* Stats Section */}
        <HStack spacing={8} wrap="wrap" justify="center" mb={16}>
          <StatBox icon={FaHeartbeat} stat="30%" label="Poor Communication between patients and providers" />
          <StatBox icon={FaChartLine} stat="80%" label="Preventable Chronic Diseases with Early Intervention" />
          <StatBox icon={FaUserShield} stat="36%" label="Adults with Low Health Literacy in the U.S." />
          <StatBox icon={FaLightbulb} stat="10-20%" label="Avoidable Hospitalizations with Timely Reminders" />
        </HStack>

        <VStack spacing={10} align="stretch" width={{ base: "90%", md: "70%", lg: "60%" }} mx="auto">

          {/* Motivation Section */}
          <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg" opacity={0.9}
          //boxShadow="lg"
          transition="transform 0.6s ease, box-shadow 0.6s ease"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }} >
            <Heading fontSize="3xl" color="primary" mb={4}>
              Our Motivation
            </Heading>
            <Divider mb={4} borderColor="primary" />
            <Text fontSize="lg" color="primary" lineHeight="1.7" opacity={1}>
              We’re motivated by the critical challenges in healthcare today—communication gaps, late disease detection, and low health literacy. By empowering patients and doctors, PatientPriority aims to fill these gaps, driving better health outcomes and streamlined care.
            </Text>
            <Stack mt={6} spacing={4}>
              <Text color="#335d8f" opacity={1} fontWeight="semibold">• Poor Communication: <Text as="span" color="primary">30%</Text> of patients report ineffective communication with healthcare providers.</Text>
              <Text color="#335d8f" opacity={1} fontWeight="semibold">• Late Disease Detection: <Text as="span" color="primary">1 in 3</Text> cancer cases are detected at an advanced stage.</Text>
              <Text color="#335d8f" opacity={1} fontWeight="semibold">• Low Health Literacy: Roughly <Text as="span" color="primary">36%</Text> of U.S. adults have low health literacy.</Text>
              <Text color="#335d8f" opacity={1} fontWeight="semibold">• Missed Health Reminders: Preventable hospitalizations could be reduced by <Text as="span" color="primary">10-20%</Text> with simple, timely reminders.</Text>
            </Stack>
          </Box>

          {/* Project Overview Section */}
          <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg" opacity={0.9}
          //boxShadow="lg"
          transition="transform 0.6s ease, box-shadow 0.6s ease"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }} >
            <Heading fontSize="3xl" color="primary" mb={4}>
              What We Do
            </Heading>
            <Divider mb={4} borderColor="secondary" />
            <Text fontSize="lg" color="primary" lineHeight="1.7" opacity={1}>
              PatientPriority provides an intuitive platform for doctors and patients to interact, share health information, and manage care proactively. With an AI-driven system, we help patients and doctors make informed decisions and provide insights tailored to individual needs.
            </Text>
            <Box mt={6}>
              <Text color="#335d8f" fontWeight="bold" fontSize="xl">Key Features:</Text>
              <Stack spacing={4} mt={3}>
              <Text color="secondary" opacity={1}>
                • <strong>Doctor Portal:</strong> Simplify workflows with secure tools to upload notes, manage patient profiles, and track daily tasks efficiently.
              </Text>
              <Text color="secondary" opacity={1}>
                • <strong>Patient Dashboard:</strong> Empower patients with a personalized space to monitor appointments, prescriptions, health history, and proactive care plans.
              </Text>
              <Text color="secondary" opacity={1}>
                • <strong>AI-Powered Insights:</strong> Leverage generative AI to provide personalized health suggestions, timely reminders, and preventive care recommendations tailored to each patient.
              </Text>
              <Text color="secondary" opacity={1}>
                • <strong>Easy Transcription:</strong> Save time with AI-powered transcription of doctor-patient conversations, ensuring accurate and actionable records.
              </Text>
              <Text color="secondary" opacity={1}>
                • <strong>Secure OAuth Login:</strong> Enhance security and ease of access for doctors and patients through seamless Single Sign-On with Google.
              </Text>
              <Text color="secondary" opacity={1}>
                • <strong>Audio Upload & Transcription:</strong> Allow on-the-go documentation with audio uploads that are transcribed into actionable text.
              </Text>
              <Text color="secondary" opacity={1}>
                • <strong>AI Chatbot Support:</strong> Enjoy instant assistance with an AI chatbot that answers questions, provides reminders, and delivers personalized advice.
              </Text>

              </Stack>
            </Box>
          </Box>

          {/* Unique Features Section */}
          <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg" opacity={0.9}
          //boxShadow="lg"
          transition="transform 0.6s ease, box-shadow 0.6s ease"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }} >
            <Heading fontSize="3xl" color="primary" mb={4}>
              What Sets Us Apart
            </Heading>
            <Divider mb={4} borderColor="secondary" />
            <Text fontSize="lg" color="primary" lineHeight="1.7" opacity={1}>
              At PatientPriority, we go beyond traditional healthcare platforms. By combining cutting-edge AI with a human-centric approach, we create a seamless and proactive healthcare experience tailored to every individual.
            </Text>
            <Box mt={6}>
              <Text color="#335d8f" fontWeight="bold" fontSize="xl" opacity={1} >Why Choose Us:</Text>
              <Stack spacing={4} mt={3}>
                <Text color="secondary" opacity={1}>
                  • <strong>AI-Powered Insights:</strong> Leverage generative AI to provide actionable health tips, personalized reminders, and wellness recommendations.
                </Text>
                <Text color="secondary" opacity={1}>
                  • <strong>Streamlined Appointments:</strong> Effortlessly schedule and manage appointments with integrated tools designed to reduce no-shows and improve efficiency.
                </Text>
                <Text color="secondary" opacity={1}>
                  • <strong>Patient-Centric Design:</strong> Empower patients with an intuitive dashboard for tracking appointments, health history, and prescriptions.
                </Text>
                <Text color="secondary" opacity={1}>
                  • <strong>Secure & Seamless Access:</strong> Enjoy peace of mind with robust security through OAuth login and an easy-to-use interface for all users.
                </Text>
                <Text color="secondary" opacity={1}>
                  • <strong>Enhanced Doctor Tools:</strong> Simplify workflows with transcription services, task management, and centralized patient profiles.
                </Text>
                <Text color="secondary" opacity={1}>
                  • <strong>Proactive Health Management:</strong> Stay ahead with timely health reminders, preventive alerts, and AI-driven chatbot support.
                </Text>
              </Stack>
            </Box>
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
    </ChakraProvider>
  );
};

export default AboutUs;