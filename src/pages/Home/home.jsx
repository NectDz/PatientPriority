import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); //from react router, use to redirect to pages

  const handleDoctorLogin = () => { navigate('/doctorSignIn'); };

  const handlePatientLogin = () => { navigate('/patient-login'); };

  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        backgroundColor="#EEF4ED" //we can change this
      >

        <Heading as="h1" size="2xl" color="#134074" mb="4">
          Welcome to PatientPriority
        </Heading>

        <Text fontSize="xl" color="#13315C" mb="10" textAlign="center">
          Helping patients and doctors stay connected, informed, and proactive.
        </Text>
        
        <Box display="flex" gap="4">
          
          

        </Box>
        
      </Box>
    </ChakraProvider>
  );
}

export default Home;