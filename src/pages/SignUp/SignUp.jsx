import React from 'react';
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import doctorIcon from "../../assets/doctor.png";
import patientIcon from "../../assets/patient.png";
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleDoctorSignUp = () => {
    navigate('/doctorSignUp');
  };

  const handlePatientSignUp = () => {
    navigate('/patientSignUp');
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      backgroundColor="#EEF4ED" // Matches the homepage background
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={8}
    >
      <Box mb="8">
        <Heading fontSize="6xl" color="#252B42" mb="4">Glad to have you here!</Heading>
        <Text fontSize="3xl" color="#737373">What best describes you?</Text>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="60%"
      >
        {/* Doctor Side */}
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={handleDoctorSignUp}
          className="hover-effect" // Applies the hover effect from CSS
        >
          <Image
            src={doctorIcon}
            alt="Doctor Icon"
            boxSize="250px" // Bigger size for the PNG icon
            objectFit="contain"
          />
          <Text fontSize="3xl" color="#252B42" mt="4">Doctor</Text>
        </Box>

        {/* Vertical Divider */}
        <Box
          width="1px"
          height="100%"
          backgroundColor="#737373" // Vertical divider with gray color
        />

        {/* Patient Side */}
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={handlePatientSignUp}
          className="hover-effect"
        >
          <Image
            src={patientIcon}
            alt="Patient Icon"
            boxSize="250px"
            objectFit="contain"
          />
          <Text fontSize="3xl" color="#252B42" mt="4">Patient</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
