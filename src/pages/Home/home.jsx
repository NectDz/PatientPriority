import React, { useState } from 'react'; //new import
import { ChakraProvider, Box, Heading, Text, Button, Input, Image } from "@chakra-ui/react"; //input for form
import { useNavigate } from 'react-router-dom';
import pulseHeart from "../../assets/pulse-heart.png"; 

const Home = () => {
  const navigate = useNavigate(); 

  const [visibleForm, setVisibleForm] = useState(null); // managing state for which form is currently visible, default to null (other states are 'doctor or patient')

  const [isAuthenticating, setIsAuthenticating] = useState(false); // new state for authenticating screen -- prolly delete after database check is done?

  const handleDoctorLogin = () => { setVisibleForm('doctor'); }; //handlers to show form
  const handlePatientLogin = () => { setVisibleForm('patient'); };
  const handleCreateAccount = () => { navigate('/signUp'); }; //tbd, rn it just routes
  const handleBack = () => { setVisibleForm(null); }; //to go back to homepage from form
  const handleSubmit = (formType) => {
    setIsAuthenticating(true); //show authenticating screen
    setTimeout(() => {
      if (formType === 'doctor') 
        {
        navigate('/Login'); //change to navigate('/doctorLogin') when routing is fixed, currently it's just a blank screen (10/4)
      } 

      else if (formType === 'patient') 
      {
        navigate('/Login'); //change to navigate('/patientLogin') when routing is fixed, currently it's just a blank screen (10/4)
      }

    }, 2000); //authentication delay llmao, when database is in play it will actually have a delay
  };

  return (
    <ChakraProvider>

      <Box
        position="relative"
        height="100vh" //need to keep these at a 100 for full view
        width="100vw"
        backgroundColor="#EEF4ED"
        overflow="hidden"
      >

        {isAuthenticating && (
          <Box 
            position="absolute" 
            top="0" 
            left="0" 
            width="100%" 
            height="100%" 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            backgroundColor="#EFF8F8"
            zIndex="999"
          >
            <Text fontSize="4xl" color="#252B42">Authenticating...</Text>
          </Box>
        )}

        <Box
          position="absolute"
          top="0"
          left={visibleForm === 'doctor' ? '100%' : visibleForm === 'patient' ? '-100%' : '0'} //when visible form is doctor, its 100 aka slide right. vice versa for patient, 0 if null (default)
          display="flex"
          flexDirection="row"
          justifyContent="space-between" 
          alignItems="center" //vertically center
          width="100%"
          height="100%"
          backgroundColor="#EFF8F8"
          p={8}
          transition="left 0.5s ease-in-out" //slide transition
        >
          
          <Box display="flex" flexDirection="column">

            <Heading fontSize="8xl" color="#252B42" mb="0">
              A Place Where Care
            </Heading>

            <Heading fontSize="8xl" color="#252B42">
              Meets Clarity...
            </Heading>

            <Text fontSize="4xl" color="#737373" mt="4">
              Helping doctors and patients stay informed and proactive.
            </Text>

            <Box display="flex" gap="4" mt="8">
              
              <Button
                colorScheme="teal"
                onClick={handleDoctorLogin}
                bg="#5AACA8"
                color="white"
                size="lg"
                _hover={{ bg: "#4D9A94" }} //not visible if not hovering?
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
                borderColor="#EFF8F8"
                borderWidth="2px"
              >
                Login as Patient
              </Button>

            </Box>

            <Text fontSize="2xl" color="#5AACA8" cursor="pointer" textDecoration="underline" mt="4" onClick={handleCreateAccount}>
              Don’t have an account? Click here to sign up!
            </Text>
          
          </Box>

          <Image
            src={pulseHeart}
            alt="Pulse Heart"
            boxSize="800px"
            objectFit="contain"
            mr="0" //push image to the right
          />

        </Box>

        <Box
          position="absolute" //doctor login form
          top="0"
          left={visibleForm === 'doctor' ? '0' : '-100%'} //slide itno view from right (doctor)
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          backgroundColor="#EFF8F8"
          p={8}
          transition="left 0.5s ease-in-out" 
        >
          
          <Heading fontSize="4xl" color="#252B42" mb="4">Doctor Login</Heading> 
          <Input placeholder="First Name" mb="4" /> 
          <Input placeholder="Last Name" mb="4" />
          <Input placeholder="Credential" mb="4" />
          
          <Box display="flex" flexDirection="row" gap="4" mt="4">
          
            <Button bg="#5AACA8" color="white" size="lg" width="200px" height="50px" onClick={() => handleSubmit('doctor')}>
              Submit
            </Button>
            
            <Button bg="#737373" color="white" size="lg" width="200px" height="50px" onClick={handleBack}>
              Back
            </Button>
        
          </Box>

        </Box>


        <Box
          position="absolute" //patient login form
          top="0"
          left={visibleForm === 'patient' ? '0' : '100%'} //slide itno view from left (patient)
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          backgroundColor="#EFF8F8"
          p={8}
          transition="left 0.5s ease-in-out"
        >
          
          <Heading fontSize="4xl" color="#252B42" mb="4">Patient Login</Heading>
          <Input placeholder="Username" mb="4" />
          <Input placeholder="Password" mb="4" />
          <Input placeholder="Re-enter Password" mb="4" />

          <Box display="flex" flexDirection="row" gap="4" mt="4">
          
            <Button bg="#5AACA8" color="white" size="lg" width="200px" height="50px" onClick={() => handleSubmit('patient')}>
              Submit
            </Button> 
            
            <Button bg="#737373" color="white" size="lg" width="200px" height="50px" onClick={handleBack}>
              Back
            </Button>
        
          </Box>

        </Box>
      </Box>

    </ChakraProvider>
  );
};

export default Home;