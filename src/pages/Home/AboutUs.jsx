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
    secondary: "#335d8f",
    highlight: "#ff5c5c",
    background: "#f1f8ff",
    accent: "#4d7098",
  },
});

const StatBox = ({ icon, stat, label }) => (
  <Box
  p={4}
  backgroundColor="white"
  boxShadow="md"
  borderRadius="md"
  textAlign="center"
  width={{ base: "100%", md: "250px" }}
  transition="all 0.3s ease"
  _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
>
  <Icon as={icon} boxSize="2em" color="highlight" mb={2} />
  <Text fontSize="4xl" fontWeight="bold" color="highlight">
    {stat}
  </Text>
  <Text color="secondary" fontSize="lg">
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
          <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg">
            <Heading fontSize="3xl" color="primary" mb={4}>
              Our Motivation
            </Heading>
            <Divider mb={4} borderColor="secondary" />
            <Text fontSize="lg" color="secondary" lineHeight="1.7">
              We’re motivated by the critical challenges in healthcare today—communication gaps, late disease detection, and low health literacy. By empowering patients and doctors, PatientPriority aims to fill these gaps, driving better health outcomes and streamlined care.
            </Text>
            <Stack mt={6} spacing={4}>
              <Text color="accent" fontWeight="semibold">- Poor Communication: <Text as="span" color="highlight">30%</Text> of patients report ineffective communication with healthcare providers.</Text>
              <Text color="accent" fontWeight="semibold">- Late Disease Detection: <Text as="span" color="highlight">1 in 3</Text> cancer cases are detected at an advanced stage.</Text>
              <Text color="accent" fontWeight="semibold">- Low Health Literacy: Roughly <Text as="span" color="highlight">36%</Text> of U.S. adults have low health literacy.</Text>
              <Text color="accent" fontWeight="semibold">- Missed Health Reminders: Preventable hospitalizations could be reduced by <Text as="span" color="highlight">10-20%</Text> with simple, timely reminders.</Text>
            </Stack>
          </Box>

          {/* Project Overview Section */}
          <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg">
            <Heading fontSize="3xl" color="primary" mb={4}>
              What We Do
            </Heading>
            <Divider mb={4} borderColor="secondary" />
            <Text fontSize="lg" color="secondary" lineHeight="1.7">
              PatientPriority provides an intuitive platform for doctors and patients to interact, share health information, and manage care proactively. With an AI-driven system, we help patients and doctors make informed decisions and provide insights tailored to individual needs.
            </Text>
            <Box mt={6}>
              <Text color="accent" fontWeight="bold" fontSize="xl">Key Features:</Text>
              <Stack spacing={4} mt={3}>
                <Text color="secondary">- <strong>Doctor Portal:</strong> Securely upload notes and manage post-visit documentation.</Text>
                <Text color="secondary">- <strong>Patient Dashboard:</strong> A customized space for patients to track appointments, prescriptions, and health history.</Text>
                <Text color="secondary">- <strong>AI-Powered Insights:</strong> Generates personalized health suggestions, reminders, and preventive tips.</Text>
              </Stack>
            </Box>
          </Box>

          {/* Unique Features Section */}
          <Box backgroundColor="white" borderRadius="md" p={8} boxShadow="lg">
            <Heading fontSize="3xl" color="primary" mb={4}>
              What Sets Us Apart
            </Heading>
            <Divider mb={4} borderColor="secondary" />
            <Text fontSize="lg" color="secondary" lineHeight="1.7">
              PatientPriority is not just another health platform; we prioritize personalization and proactive care. Leveraging AI technology, we deliver a unique experience that stands out in today’s healthcare landscape.
            </Text>
            <Box mt={6}>
              <Text color="accent" fontWeight="bold" fontSize="xl">Why Choose Us:</Text>
              <Stack spacing={4} mt={3}>
                <Text color="secondary">- <strong>AI-Driven Personalization:</strong> Personalized insights and recommendations based on patient profiles.</Text>
                <Text color="secondary">- <strong>User-Friendly Design:</strong> Accessible interface designed for all levels of tech experience.</Text>
                <Text color="secondary">- <strong>Proactive Health Management:</strong> Health reminders and preventive alerts that encourage proactive care.</Text>
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