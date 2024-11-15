import React, { useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import doctorIcon from "../../assets/doctor.png";
import patientIcon from "../../assets/patient.png";
import "./SignUp.css";
import Footer from "../Home/Footer";

const SignUp = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userType, setUserType] = useState(""); // To determine whether it's doctor or patient

  const handleDoctorSignUp = () => {
    setUserType("Doctor");
    onOpen();
  };

  const handlePatientSignUp = () => {
    setUserType("Patient");
    onOpen();
  };

  const confirmNavigation = () => {
    if (userType === "Doctor") {
      navigate("/doctor-signup"); //unsure
    } else if (userType === "Patient") {
      navigate("/patient-signup"); //not sure, probably nav to Rahat's questionnaire
    }
    onClose();
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      backgroundColor="#f1f8ff"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={8}
    >
      <Box
        mb="8"
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading fontSize="6xl" color="#00366d" mb="4">
          Glad to have you here!
        </Heading>
        <Text fontSize="3xl" color="#335d8f">
          What best describes you?
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="60%"
      >
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={handleDoctorSignUp}
          className="doctor-hover-effect"
        >
          <Image
            src={doctorIcon}
            alt="Doctor Icon"
            className="image-hover-effect"
            boxSize="300px" //icon size
            objectFit="contain"
          />
          <Text fontSize="3xl" color="#335d8f" mt="4">
            Doctor
          </Text>
        </Box>

        <Box width="5px" height="100%" backgroundColor="#00366d" />

        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={handlePatientSignUp}
          className="patient-hover-effect"
        >
          <Image
            src={patientIcon}
            alt="Patient Icon"
            className="image-hover-effect"
            boxSize="300px"
            objectFit="contain"
          />
          <Text fontSize="3xl" color="#335d8f" mt="4">
            Patient
          </Text>
        </Box>
      </Box>

      {/* Disclaimer Popup */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Important Disclaimer</ModalHeader>
          <ModalBody>
            <Text fontSize="md" mb="4">
              By creating an account on PatientPriority, you acknowledge and
              agree to the following:
            </Text>
            <Box pl="4">
              <Text fontSize="sm" mb="2">
                • Your personal data may be stored securely in our database for
                the purpose of delivering personalized healthcare
                recommendations.
              </Text>
              <Text fontSize="sm" mb="2">
                • PatientPriority complies with HIPAA standards to protect your
                sensitive health information.
              </Text>
              <Text fontSize="sm" mb="2">
                • The platform provides AI-driven insights and recommendations
                as a supplementary resource. These do not replace professional
                medical advice.
              </Text>
              <Text fontSize="sm" mb="2">
                • You are responsible for ensuring the accuracy of all submitted
                information.
              </Text>
              <Text fontSize="sm" mb="2">
                • PatientPriority is not liable for any harm, injury, or adverse outcomes resulting from the use of the platform.
              </Text>
              <Text fontSize="md" mb="4">
                Please visit our FAQ page, fill out a support ticket or contact us for further inquiries at this time.
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmNavigation}>
              Agree and Continue
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
      <Footer/>
    </Box>
  );
};

export default SignUp;