// AboutUs.jsx

import React from "react";
import { ChakraProvider, Box, Heading, Text, VStack, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Sansation, sans-serif",
    body: "Sansation, sans-serif",
  },
});

const AboutUs = () => {
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
      >
        {/* Page Title */}
        <Heading fontSize="4xl" color="#00366d" mb="8" textAlign="center">
          About Us
        </Heading>

        <VStack spacing={8} align="stretch" width={{ base: "90%", md: "70%", lg: "60%" }} mx="auto">

          {/* Motivation Section */}
          <Box backgroundColor="white" borderRadius="md" p={6} boxShadow="lg">
            <Heading fontSize="2xl" color="#00366d" mb={4}>
              Our Motivation
            </Heading>
            <Text fontSize="lg" color="#335d8f">
              At PatientPriority, we recognize the challenges patients and healthcare providers face in today’s healthcare landscape:
            </Text>
            <Text mt={4} color="#4d7098">
              - **Poor Communication**: Around 30% of patients report inadequate communication with their providers, impacting their health journey.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Late Disease Detection**: The American Cancer Society notes that 1 in 3 cancers are diagnosed late, leading to difficult and costly treatments.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Missed Early Detection**: According to the CDC, early intervention could prevent up to 80% of chronic disease-related deaths.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Low Health Literacy**: Approximately 36% of U.S. adults have low health literacy, leading to misunderstandings about conditions and medications.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Missed Health Reminders**: Simple reminders can reduce preventable hospitalizations by 10-20%.
            </Text>
            <Text mt={4} fontSize="lg" color="#335d8f">
              These challenges inspired us to create a platform that bridges these gaps and empowers patients and providers alike.
            </Text>
          </Box>

          {/* Project Overview Section */}
          <Box backgroundColor="white" borderRadius="md" p={6} boxShadow="lg">
            <Heading fontSize="2xl" color="#00366d" mb={4}>
              Project Overview
            </Heading>
            <Text fontSize="lg" color="#335d8f">
              PatientPriority is a comprehensive platform designed for both **doctors** and **patients**:
            </Text>
            <Text mt={4} color="#4d7098">
              - **Doctor Side**: A secure portal for doctors to upload meeting notes, simplifying post-visit documentation and managing multiple patients.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Patient Side**: A personalized experience for patients, allowing them to complete a detailed health questionnaire that helps build a customized **Patient Profile** with health insights.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Generative AI Integration**: The platform leverages AI to analyze each patient’s profile, offering insights, recommendations, and personalized tips for preventive care, lifestyle adjustments, and health monitoring.
            </Text>
            <Text mt={4} fontSize="lg" color="#335d8f">
              Our goal is to promote proactive health management by providing a seamless, user-friendly experience.
            </Text>
          </Box>

          {/* Unique Features Section */}
          <Box backgroundColor="white" borderRadius="md" p={6} boxShadow="lg">
            <Heading fontSize="2xl" color="#00366d" mb={4}>
              What Makes Us Unique
            </Heading>
            <Text fontSize="lg" color="#335d8f">
              While other platforms like **MyChart**, **NYP Connect**, and **Mayo Clinic Online Services** offer patient portals, PatientPriority stands out by focusing on:
            </Text>
            <Text mt={4} color="#4d7098">
              - **Ease of Use**: Our platform is designed for all users, with a straightforward sign-up process and easy navigation, ensuring accessibility for patients of all tech levels.
            </Text>
            <Text mt={2} color="#4d7098">
              - **AI-Driven Personalization**: Unlike other platforms, PatientPriority uses AI to provide tailored health insights, diet and lifestyle suggestions, and preventive care reminders based on each patient’s unique profile.
            </Text>
            <Text mt={2} color="#4d7098">
              - **Proactive Health Management**: We emphasize preventive care by offering reminders and recommendations to avoid late disease detection and reduce preventable hospitalizations.
            </Text>
            <Text mt={4} fontSize="lg" color="#335d8f">
              With PatientPriority, we’re not just managing health records—we’re helping patients and doctors work together for proactive, personalized care.
            </Text>
          </Box>
          
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default AboutUs;
