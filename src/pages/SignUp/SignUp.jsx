import React from 'react';
import { ChakraProvider, Box, Heading, Text, Image, VStack } from '@chakra-ui/react';
import doctorIcon from "../../assets/doctor.png"; // import your doctor icon
import patientIcon from "../../assets/patient.png"; // import your patient icon
import './SignUp.css'; // for the divider and additional styling

const SignUp = () => {
  return (
    <ChakraProvider>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh" 
        backgroundColor="#EEF4ED"
        padding="2rem"
      >
        <Heading fontSize="4xl" color="#252B42" mb="4">
          Glad to have you here!
        </Heading>

        <Text fontSize="2xl" color="#737373" mb="6">
          What best describes you?
        </Text>

        <Box 
          display="flex" 
          flexDirection="row" 
          alignItems="center" 
          justifyContent="center"
          width="80%"
          height="60vh"
          backgroundColor="#EFF8F8"
          borderRadius="10px"
          boxShadow="lg"
        >
          {/* Doctor Side */}
          <VStack width="50%" justifyContent="center" alignItems="center">
            <Image src={doctorIcon} alt="Doctor Icon" boxSize="150px" />
            <Text fontSize="2xl" color="#252B42">Doctor</Text>
          </VStack>

          {/* Divider */}
          <Box 
            className="vertical-divider"
            height="80%"
            backgroundColor="#D9E7E7"
          />

          {/* Patient Side */}
          <VStack width="50%" justifyContent="center" alignItems="center">
            <Image src={patientIcon} alt="Patient Icon" boxSize="150px" />
            <Text fontSize="2xl" color="#252B42">Patient</Text>
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default SignUp;