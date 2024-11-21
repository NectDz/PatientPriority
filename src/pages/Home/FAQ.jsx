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
  FaCalendarCheck,
  FaCommentDots,
  FaLock,
  FaFileMedical,
  FaAmbulance,
  FaUserEdit,
  FaSyncAlt,
  FaExclamationCircle,
  FaVideo,
  FaQuestionCircle,
  FaHandsHelping,
  FaBalanceScale,
  FaShieldAlt,
  FaAddressCard,
} from "react-icons/fa";

const faqData = [
  {
    question: "What is Patient Priority?",
    answer:
      "Patient Priority is a platform designed to streamline communication between patients and healthcare providers, making it easier for patients to book appointments, ask questions, track health records, and receive timely responses from their doctors. Our goal is to improve your overall experience and ensure that you receive the care you need efficiently.",
    icon: FaInfoCircle,
    iconColor: "primary",
  },
  {
    question: "How do I book an appointment with my doctor?",
    answer:
      "To book an appointment, simply log in to your Patient Priority account, search for your healthcare provider, and choose an available time slot that works for you. You can schedule in-person or virtual appointments, depending on your provider's availability.",
    icon: FaCalendarCheck,
    iconColor: "highlight",
  },
  {
    question: "Can I message my doctor directly through the platform?",
    answer:
      "Yes, you can message your doctor securely through our messaging system. Whether you need clarification on a prescription, ask follow-up questions, or discuss symptoms, you can contact your doctor at any time. Responses will typically be provided within 24 hours.",
    icon: FaCommentDots,
    iconColor: "secondary",
  },
  {
    question: "Is my personal health information safe on Patient Priority?",
    answer:
      "Absolutely. Patient Priority is committed to protecting your privacy. All personal and health information is encrypted and stored in compliance with healthcare regulations like HIPAA (Health Insurance Portability and Accountability Act), ensuring that your data is safe and confidential.",
    icon: FaLock,
    iconColor: "accent",
  },
  {
    question: "How do I get my medical records?",
    answer:
      "You can access your medical records directly through the Patient Priority portal. Simply log in to your account and navigate to the “Health Records” section. If you need any help retrieving or understanding your records, our support team is available to assist.",
    icon: FaFileMedical,
    iconColor: "primary",
  },
  {
    question: "What should I do if I have an emergency and can’t reach my doctor?",
    answer:
      "If you have a medical emergency, please call emergency services or go to the nearest emergency room. Patient Priority is designed for non-urgent consultations and follow-ups, so for emergencies, immediate medical attention is necessary.",
    icon: FaAmbulance,
    iconColor: "highlight",
  },
  {
    question: "Can I switch doctors or update my healthcare provider on Patient Priority?",
    answer:
      "Yes, you can easily update your healthcare provider within your Patient Priority account settings. If you want to change doctors or need to update your provider’s details, just follow the instructions in your account or contact our support team for assistance.",
    icon: FaUserEdit,
    iconColor: "secondary",
  },
  {
    question: "How do I cancel or reschedule an appointment?",
    answer:
      "You can cancel or reschedule your appointment directly from the platform. Simply log in, navigate to your upcoming appointments, and select the option to reschedule or cancel. We recommend doing this at least 24 hours in advance to avoid cancellation fees (if applicable).",
    icon: FaSyncAlt,
    iconColor: "accent",
  },
  {
    question: "What happens if I don't get a response from my doctor in time?",
    answer:
      "If you haven’t received a response within the expected timeframe, you can follow up with a gentle reminder through the platform. If the issue is urgent, please seek advice from another healthcare professional or contact our support team for further assistance.",
    icon: FaExclamationCircle,
    iconColor: "primary",
  },
  {
    question: "Are telemedicine appointments available?",
    answer:
      "Yes, many of our healthcare providers offer telemedicine consultations via video calls. When scheduling an appointment, you’ll be able to select whether you'd prefer an in-person or virtual visit.",
    icon: FaVideo,
    iconColor: "highlight",
  },
  {
    question: "What should I do if I’m having trouble navigating the platform?",
    answer:
      "If you’re experiencing any technical issues or need help navigating the platform, please visit our help section or contact customer support. Our team is available to assist you with any questions or problems you may encounter.",
    icon: FaQuestionCircle,
    iconColor: "secondary",
  },
  {
    question: "How does Patient Priority improve communication with my doctor?",
    answer:
      "Patient Priority enhances communication by offering secure messaging, easy appointment scheduling, and reminders, as well as facilitating the sharing of medical records and follow-up care instructions. This ensures your doctor has the information they need, and you have more direct access to care.",
    icon: FaHandsHelping,
    iconColor: "accent",
  },
  {
    question: "Can I get a second opinion through Patient Priority?",
    answer:
      "Yes, if you're considering a second opinion, you can reach out to different healthcare providers available on the platform. You can schedule a consultation with another specialist or provider to discuss your health concerns and receive additional advice.",
    icon: FaBalanceScale,
    iconColor: "primary",
  },
  {
    question: "How do I know if my insurance is accepted?",
    answer:
      "You can verify whether your insurance is accepted by checking your provider’s profile on Patient Priority. If you need further assistance, you can also contact our support team, who can help confirm your insurance details.",
    icon: FaShieldAlt,
    iconColor: "highlight",
  },
  {
    question: "How do I update my contact or insurance information?",
    answer:
      "You can easily update your contact information and insurance details in your Patient Priority account settings. Make sure your details are up-to-date to ensure smooth communication and billing.",
    icon: FaAddressCard,
    iconColor: "secondary",
  },
{
  Question: "Looking for something else?",
  answer: "Email us at contact.patientpriority@gmail.com",
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
    >
      <Box height="100px" />

      <Heading fontSize="6xl" color="#00366d" mb={4} textAlign="center">
        FAQ
      </Heading>
      <Text fontSize="2xl" color="#00366d" textAlign="center" mb={12} maxW="80%">
        Frequently Asked Questions
      </Text>

      <VStack spacing={8} align="stretch" width={{ base: "90%", md: "70%", lg: "60%" }} mx="auto">
        {faqData.map((faq, index) => (
          <Box 
            key={index} 
            backgroundColor="rgba(255, 255, 255, 0.6)"
            borderRadius="md" 
            p={8} 
            boxShadow="lg"
            transition="transform 0.6s ease, box-shadow 0.6s ease"
            _hover={{ transform: "scale(1.1)", boxShadow: "xl" }} 
          >
            <Stack direction="row" align="center" spacing={4} mb={4}>
              <Icon as={faq.icon} boxSize="1.5em" color={theme.colors[faq.iconColor]} />
              <Heading fontSize="xl" color="primary">
                {faq.question}
              </Heading>
            </Stack>
            <Divider mb={4} borderColor="secondary" />
            <Text fontSize="lg" color="secondary" lineHeight="1.7">
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