import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Link, Image } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import pulseHeart from "../../assets/pulse-heart.png"; // Adjust the path if necessary

const Home = () => {
  const navigate = useNavigate(); // from react router, use to redirect to pages

  const handleDoctorLogin = () => { navigate('/doctorSignIn'); };

  const handlePatientLogin = () => { navigate('/patientSignIn'); }; // buttons

  const handleCreateAccount = () => { navigate('/signUp'); }; // triggered when user clicks first time here link

  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        backgroundColor="#EEF4ED"
      >
        <Box
          display="flex"
          flexDirection="row" 
          justifyContent="center"
          alignItems="center"
          height="100%" 
          width="100%" 
          backgroundColor="#EFF8F8" // diff background color for the welcome text and the heart
          p={8} // spacing
          borderRadius="md"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            width="60%"
            mx={4} // Add horizontal margin
          >
            <Heading fontSize="8xl" as="h1" size="2xl" color="#252B42" mb="4" textAlign="left"> 
              A Place Where Care meets Clarity...
            </Heading>

            <Text fontSize="4xl" color="#737373" mb="10" textAlign="left"> 
              Helping doctors and patients stay informed and proactive.
            </Text>
            
            <Box display="flex" gap="4" mb="4">
              <Button
                colorScheme="teal"
                onClick={handleDoctorLogin}
                bg="#5AACA8" 
                color="white" 
                size="lg" 
                _hover={{ bg: "#4D9A94" }}
                borderColor="#EFF8F8"
                borderWidth="2px"
              >
                Login as Doctor
              </Button>

              <Button
                colorScheme="teal"
                onClick={handlePatientLogin}
                bg="#EFF8F8" 
                color="#5AACA8" 
                size="lg" 
                _hover={{ bg: "#D9E7E7" }} 
                borderColor="#00000"
                borderWidth="2px"
              >
                Login as Patient
              </Button>
            </Box>

            <Text
              fontSize="2xl"
              color="#5AACA8"
              cursor="pointer"
              textDecoration="underline"
              onClick={handleCreateAccount}
            >
              Don’t have an account? Click here to sign up!
            </Text>
          </Box>

          <Image
            src={pulseHeart}
            alt="Pulse Heart"
            boxSize="800px" // heart size
            objectFit="contain"
            mx={4} // Add horizontal margin to balance space from the edge
            ml="auto" // push image to the right
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
