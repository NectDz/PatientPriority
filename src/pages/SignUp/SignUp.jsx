import React from 'react';
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import doctorIcon from "../../assets/doctor.png";
import patientIcon from "../../assets/patient.png";
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleDoctorSignUp = () => {
    navigate('/doctorSignUp'); //unsure
  };

  const handlePatientSignUp = () => {
    navigate('/patientSignUp'); //not sure, probably nav to rahats questionnaire
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      backgroundColor="#EEF4ED"
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
        <Heading fontSize="6xl" color="#252B42" mb="4">
          Glad to have you here!
        </Heading>
        <Text fontSize="3xl" color="#737373">
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
          <Text fontSize="3xl" color="#252B42" mt="4">
            Doctor
          </Text>
        </Box>

        <Box
          width="5px"
          height="100%"
          backgroundColor="#737373"
        />

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
          <Text fontSize="3xl" color="#252B42" mt="4">
            Patient
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;