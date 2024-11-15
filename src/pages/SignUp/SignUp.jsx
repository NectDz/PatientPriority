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
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import doctorIcon from "../../assets/doctor.png";
import patientIcon from "../../assets/patient.png";
import "./SignUp.css";

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
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalBody>
            <Text fontSize="lg">
              By proceeding, you agree to our terms and conditions and consent
              to your data being processed in accordance with our privacy
              policy.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={confirmNavigation}>
              I Agree
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SignUp;