// import React, { useState, useEffect, useRef } from "react"; //new import
// import {
//   ChakraProvider,
//   Box,
//   Heading,
//   Text,
//   Button,
//   Input,
//   Image,
// } from "@chakra-ui/react"; //input for form
// import { useNavigate } from "react-router-dom";
// import pulseHeart from "../../assets/pulse-heart.png";
// import heartBeatSound from "../../assets/heartbeat-sound.mp3";
// import "./Home.css";

// const Home = () => {
//   const navigate = useNavigate();

//   const [visibleForm, setVisibleForm] = useState(null); // managing state for which form is currently visible, default to null (other states are 'doctor or patient')

//   const [isAuthenticating, setIsAuthenticating] = useState(false); // new state for authenticating screen -- prolly delete after database check is done?

//   const audioRef = useRef(null);

//   const handleDoctorLogin = () => {
//     navigate("/doctor-login");
//   }; //handlers to show form
//   const handlePatientLogin = () => {
//     navigate("/patient-login");
//   };
//   const handleCreateAccount = () => {
//     navigate("/signUp");
//   }; //tbd, rn it just routes
//   const handleBack = () => {
//     setVisibleForm(null);
//   }; //to go back to homepage from form
//   const handleSubmit = (formType) => {
//     setIsAuthenticating(true); //show authenticating screen
//     setTimeout(() => {
//       if (formType === "doctor") {
//         navigate("/doctor-login");
//       } else if (formType === "patient") {
//         navigate("/patient-login");
//       }
//     }, 2000); //authentication delay llmao, when database is in play it will actually have a delay
//   };

//   useEffect(() => {
//     // const audio = audioRef.current;
//     // //audio.play(); //play sound
//     // const interval = setInterval(() => {
//     //   audio.currentTime = 0; //reset to sync with the heartbeat
//     //   audio.play(); //play sound at start of each pulse
//     // }, 5000); //sync timing with the CSS animation duration (1.5s)
//     // return () => clearInterval(interval); // Cleanup the interval when component unmounts
//   }, []);

//   const handleMouseEnter = () => {
//     const audio = audioRef.current;
//     audio.currentTime = 0; // Restart sound from beginning
//     audio.play(); // play sound on hover
//     audio.loop = true;
//   };

//   const handleMouseLeave = () => {
//     const audio = audioRef.current;
//     audio.pause(); // pause sound when hover stops
//     audio.currentTime = 0; // reset the sound to the start
//     audio.loop = false;
//   };

//   return (
//     <ChakraProvider>
//       <Box
//         position="relative"
//         height="100vh" //need to keep these at a 100 for full view
//         width="100vw"
//         backgroundColor="#EEF4ED"
//         overflow="hidden"
//       >
//         {isAuthenticating && (
//           <Box
//             position="absolute"
//             top="0"
//             left="0"
//             width="100%"
//             height="100%"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             backgroundColor="#f1f8ff"
//             zIndex="999"
//           >
//             <Text fontSize="4xl" color="#252B42">
//               Authenticating...
//             </Text>
//           </Box>
//         )}

//         <Box
//           position="absolute"
//           top="0"
//           left={
//             visibleForm === "doctor"
//               ? "100%"
//               : visibleForm === "patient"
//               ? "-100%"
//               : "0"
//           } //when visible form is doctor, its 100 aka slide right. vice versa for patient, 0 if null (default)
//           display="flex"
//           flexDirection="row"
//           justifyContent="space-between"
//           alignItems="center" //vertically center
//           width="100%"
//           height="100%"
//           backgroundColor="#f1f8ff"
//           // p={8}
//           pl="4%"
//           transition="left 0.5s ease-in-out" //slide transition
//         >
//           <Box display="flex" flexDirection="column">
//             <Heading fontSize="6xl" color="#252B42" mb="0">
//               A Place Where Care Meets Clarity...
//             </Heading>

//             <Text fontSize="2xl" color="#737373" mt="4">
//               Helping doctors and patients stay informed and proactive.
//             </Text>

//             <Box display="flex" gap="4" mt="8">
//               <Button
//                 colorScheme="teal"
//                 onClick={handleDoctorLogin}
//                 bg="#5AACA8"
//                 color="white"
//                 size="md"
//                 _hover={{ bg: "#4D9A94" }} //not visible if not hovering?
//                 borderColor="#f1f8ff"
//                 borderWidth="2px"
//               >
//                 Login as Doctor
//               </Button>

//               <Button
//                 colorScheme="teal"
//                 onClick={handlePatientLogin}
//                 bg="#f1f8ff"
//                 color="#5AACA8"
//                 size="md"
//                 _hover={{ bg: "#D9E7E7" }}
//                 borderColor="#f1f8ff"
//                 borderWidth="2px"
//               >
//                 Login as Patient
//               </Button>
//             </Box>

//             <Text
//               fontSize="xl"
//               color="#5AACA8"
//               cursor="pointer"
//               textDecoration="underline"
//               mt="4"
//               onClick={handleCreateAccount}
//             >
//               Don’t have an account? Click here to sign up!
//             </Text>
//           </Box>

//           <Box>
//             <audio ref={audioRef} src={heartBeatSound} />

//             <Image
//               src={pulseHeart}
//               alt="Pulse Heart"
//               boxSize="600px"
//               objectFit="contain"
//               mr="20" //push image to the right
//               className="pulse-animation"
//               onMouseEnter={handleMouseEnter} // trigger animation and sound on hover
//               onMouseLeave={handleMouseLeave} // stop sound when hover ends
//             />
//           </Box>
//         </Box>

//         <Box
//           position="absolute" //doctor login form
//           top="0"
//           left={visibleForm === "doctor" ? "0" : "-100%"} //slide itno view from right (doctor)
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="center"
//           width="100%"
//           height="100%"
//           backgroundColor="#f1f8ff"
//           p={8}
//           transition="left 0.5s ease-in-out"
//         >
//           <Heading fontSize="4xl" color="#252B42" mb="4">
//             Doctor Login
//           </Heading>
//           <Input placeholder="First Name" mb="4" />
//           <Input placeholder="Last Name" mb="4" />
//           <Input placeholder="Credential" mb="4" />

//           <Box display="flex" flexDirection="row" gap="4" mt="4">
//             <Button
//               bg="#5AACA8"
//               color="white"
//               size="lg"
//               width="200px"
//               height="50px"
//               onClick={() => handleSubmit("doctor")}
//             >
//               Submit
//             </Button>

//             <Button
//               bg="#737373"
//               color="white"
//               size="lg"
//               width="200px"
//               height="50px"
//               onClick={handleBack}
//             >
//               Back
//             </Button>
//           </Box>
//         </Box>

//         <Box
//           position="absolute" //patient login form
//           top="0"
//           left={visibleForm === "patient" ? "0" : "100%"} //slide itno view from left (patient)
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="center"
//           width="100%"
//           height="100%"
//           backgroundColor="#f1f8ff"
//           p={8}
//           transition="left 0.5s ease-in-out"
//         >
//           <Heading fontSize="4xl" color="#252B42" mb="4">
//             Patient Login
//           </Heading>
//           <Input placeholder="Username" mb="4" />
//           <Input placeholder="Password" mb="4" />
//           <Input placeholder="Re-enter Password" mb="4" />

//           <Box display="flex" flexDirection="row" gap="4" mt="4">
//             <Button
//               bg="#5AACA8"
//               color="white"
//               size="lg"
//               width="200px"
//               height="50px"
//               onClick={() => handleSubmit("patient")}
//             >
//               Submit
//             </Button>

//             <Button
//               bg="#737373"
//               color="white"
//               size="lg"
//               width="200px"
//               height="50px"
//               onClick={handleBack}
//             >
//               Back
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default Home;






import React, { useState, useEffect, useRef } from "react";

import {
 ChakraProvider,
 Box,
 Heading,
 Text,
 Button,
 Input,
 Image,
 Avatar,
 Link,
 extendTheme,
 IconButton,
} from "@chakra-ui/react"; //chakra components

import { useNavigate } from "react-router-dom";

import {
  FaCalendarAlt,
  FaFileAlt,
  FaUserCircle,
  FaBrain,
  FaStethoscope,
  FaLock,
  FaMicrophone,
  FaRobot,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

import pulseHeart from "../../assets/pulse-heart.png";
import heartBeatSound from "../../assets/heartbeat-sound.mp3"; //hearbeat

import Footer from "./Footer"; 

import { useInView } from 'react-intersection-observer'; 

import "./Home.css"; 

const theme = extendTheme({
 fonts: {
   heading: "Sansation, sans-serif", 
   body: "Sansation, sans-serif", 
 },
});

//memoize TeamMember to prevent re-renders -- fixed it
const TeamMember = React.memo(({ name, description, link, imageUrl }) => {
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    triggerOnce: true //this is so it only triggers the animation once
  }); 
  
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="300px"
      backgroundColor="rgba(255, 255, 255, 0.6)"
      boxShadow="lg"
      borderRadius="md"
      transition="transform 0.6s ease, box-shadow 0.6s ease"
      transform={inView ? 'scale(1)' : 'scale(0.8)'}
      opacity={inView ? 1 : 0}
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }} 
      p={4}
      m={4}
      textAlign="center"
    >
      <Image
        src={imageUrl} 
        alt={name}
        borderRadius="full" 
        boxSize="100px" 
        mb="3" 
      />
      <Link 
        href={link} 
        isExternal 
        fontSize="2xl" 
        color="#00366d"
        fontWeight="bold"
      >
        {name}
      </Link>
      <Text 
        fontSize="lg" 
        color="#335d8f" 
        mt="2"
      >
        {description}
      </Text>
    </Box>
  );
});

//memoize service component too
const ServiceBox = React.memo(({ title, description, icon }) => {
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    triggerOnce: true  //trigger the animation once only too
  }); 

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="300px"
      height="300px"
      backgroundColor="rgba(255, 255, 255, 0.6)"
      boxShadow="lg"
      borderRadius="md"
      transition="transform 0.6s ease, box-shadow 0.6s ease"
      transform={inView ? 'scale(1)' : 'scale(0.8)'}
      opacity={inView ? 1 : 0}
      _hover={{ transform: "scale(1.1)", boxShadow: "xl" }} 
      p={4}
      m={4}
      textAlign="center"
    >
      <Box fontSize="6xl" color="#4d7098" mb={2}>  {/* lighter blue for icons */}
        {icon}
      </Box>
      <Heading fontSize="3xl" color="#00366d" mb={2}>  
        {title}
      </Heading>
      <Text fontSize="lg" color="#335d8f" mt={2}>  
        {description}
      </Text>
    </Box>
  );
});

//team data is now outside component to fix rerender errors i think
const teamData = [
  {
    name: "Abir Banik",
    description: "Co-founder",
    link: "https://www.linkedin.com/in/abir-banik12918/",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQFEi2kYFWQOdw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718255233434?e=1735776000&v=beta&t=DxY2_upAqChOXGTLmifJ5RnQ8eXjSCUjBiCYbK-InZM"
  },
  {
    name: "Rahat Khandokar",
    description: "Co-founder",
    link: "https://www.linkedin.com/in/rahatkhandokar/",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQH9Uk2venhT5A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722221338570?e=1735776000&v=beta&t=YUK0C-qi1jUvGD3B0rnSG-u2FSL7pc4-v5oI1UtUF1A"
  },
  {
    name: "Kevin Granados",
    description: "Co-founder",
    link: "https://www.linkedin.com/in/kevingranados1/",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQExAIjNg_8Y1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728161486472?e=1735776000&v=beta&t=f9Nt1L14CPe2vlfOByjRhKG9LenplnWk8sIvUb5AjzU"
  },
  {
    name: "Lubna Asha",
    description: "Co-founder",
    link: "https://www.linkedin.com/in/lubna-asha/",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQG9534zuvJJvw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726032453358?e=1735776000&v=beta&t=6ibeHSvS30Jcq_wHTSHTmzee2PvKQVER5WSjFz9mPVw"
  },
  {
    name: "Kazi Anwar",
    description: "Co-founder",
    link: "https://www.linkedin.com/in/kazisanwar/",
    imageUrl: "https://media.licdn.com/dms/image/v2/D4E03AQFti8pIui5RWg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703020953252?e=1735776000&v=beta&t=yDe7U69HCSQzftVQCHXjF4krPmmL2XbfNpi54MXU4ms"
  },
  {
    name: "Ahmad Deedat",
    description: "Co-founder",
    link: "https://www.linkedin.com/in/ahmad-deedat-118355198/",
    imageUrl: "https://media.licdn.com/dms/image/v2/C5603AQGEFJr_uOs1VA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1661483882026?e=1735776000&v=beta&t=IUjYnaWO0nnfe4rIx0MmLEo1SYT7B1dTIShrjK0UgeQ"
  },
  {
    name: "Sadab Hafiz",
    description: "Principal Investor",
    link: "https://www.linkedin.com/in/sadab-hafiz/",
    imageUrl: "https://media.licdn.com/dms/image/v2/C4E03AQEfZKo3QMkBYw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1659294786553?e=1735776000&v=beta&t=FvZ750DbKdygLSWN6qNaK9cxbF8Qoyxo8lqQZR4BwW8"
  }
];

//memoized team section to avoid it cjhanging when carousel changes
const TeamSection = React.memo(() => (
  <Box display="flex" flexWrap="wrap" justifyContent="center" mt="4" px={8}>
    {teamData.map((member, index) => (
      <TeamMember
        key={member.name}
        {...member}
      />
    ))}
  </Box>
));

//memoized carousel component
const ServicesCarousel = React.memo(({ currentSlide, services }) => (
  <Box
    display="flex"
    justifyContent="center"
    mx="auto"
    overflow="hidden"
  >
    <Box
      display="flex"
      transform={`translateX(-${currentSlide * 300}px)`}
      transition="transform 0.5s ease"
      gap={4}
    >
      {/*all services and use transform to slide, throwback original homepage */}
      {[...services, ...services].map((service, index) => (
        <ServiceBox
          key={`service-${index}`}
          title={service.title}
          description={service.description}
          icon={service.icon}
        />
      ))}
    </Box>
  </Box>
));

const Home = () => {
 const navigate = useNavigate();
 const [visibleForm, setVisibleForm] = useState(null); 
 const [isAuthenticating, setIsAuthenticating] = useState(false);
 const audioRef = useRef(null);
 const [currentSlide, setCurrentSlide] = useState(0);
 const [isVisible, setIsVisible] = useState(false);



 //services
 const services = [
   {
     title: "Online Appointment",
     description: "Streamline scheduling for both doctors and patients, reducing no-shows and boosting efficiency with our integrated system.",
     icon: <FaCalendarAlt />
   },
   {
     title: "Easy Transcription",
     description: "Save time and improve record accuracy by transcribing doctor-patient conversations with AI-powered precision.",
     icon: <FaFileAlt />
   },
   {
     title: "Patient Profile Management",
     description: "Empower patients to actively engage in their healthcare with personalized dashboards and centralized health information.",
     icon: <FaUserCircle />
   },
   {
     title: "Generative AI Health Insights",
     description: "Leverage AI to analyze patient profiles and provide personalized wellness tips, reminders, and proactive health recommendations.",
     icon: <FaBrain />
   },
   {
     title: "Doctor Portal",
     description: "Simplify workflows with secure tools to upload notes, manage patient profiles, and track daily tasks efficiently.",
     icon: <FaStethoscope />
   },
   {
     title: "Secure OAuth Login",
     description: "Enhance security with seamless Single Sign-On options, currently supporting Google, for both doctors and patients.",
     icon: <FaLock />
   },
   {
     title: "Audio Upload & Transcription",
     description: "Enable on-the-go documentation with audio uploads that convert to text and structured insights for easy analysis.",
     icon: <FaMicrophone />
   },
   {
     title: "AI Chatbot Support",
     description: "Receive instant assistance with an AI chatbot that answers questions, provides reminders, and offers personalized advice.",
     icon: <FaRobot />
   },
   {
    title: "Online Appointment",
    description: "Streamline scheduling for both doctors and patients, reducing no-shows and boosting efficiency with our integrated system.",
    icon: <FaCalendarAlt />
  },
  {
    title: "Easy Transcription",
    description: "Save time and improve record accuracy by transcribing doctor-patient conversations with AI-powered precision.",
    icon: <FaFileAlt />
  },
  {
    title: "Patient Profile Management",
    description: "Empower patients to actively engage in their healthcare with personalized dashboards and centralized health information.",
    icon: <FaUserCircle />
  },
  {
    title: "Generative AI Health Insights",
    description: "Leverage AI to analyze patient profiles and provide personalized wellness tips, reminders, and proactive health recommendations.",
    icon: <FaBrain />
  },
  {
    title: "Doctor Portal",
    description: "Simplify workflows with secure tools to upload notes, manage patient profiles, and track daily tasks efficiently.",
    icon: <FaStethoscope />
  },
  {
    title: "Secure OAuth Login",
    description: "Enhance security with seamless Single Sign-On options, currently supporting Google, for both doctors and patients.",
    icon: <FaLock />
  },
  {
    title: "Audio Upload & Transcription",
    description: "Enable on-the-go documentation with audio uploads that convert to text and structured insights for easy analysis.",
    icon: <FaMicrophone />
  },
  {
    title: "AI Chatbot Support",
    description: "Receive instant assistance with an AI chatbot that answers questions, provides reminders, and offers personalized advice.",
    icon: <FaRobot />
  },
  {
    title: "Online Appointment",
    description: "Streamline scheduling for both doctors and patients, reducing no-shows and boosting efficiency with our integrated system.",
    icon: <FaCalendarAlt />
  },
  {
    title: "Easy Transcription",
    description: "Save time and improve record accuracy by transcribing doctor-patient conversations with AI-powered precision.",
    icon: <FaFileAlt />
  },
  {
    title: "Patient Profile Management",
    description: "Empower patients to actively engage in their healthcare with personalized dashboards and centralized health information.",
    icon: <FaUserCircle />
  },
  {
    title: "Generative AI Health Insights",
    description: "Leverage AI to analyze patient profiles and provide personalized wellness tips, reminders, and proactive health recommendations.",
    icon: <FaBrain />
  },
  {
    title: "Doctor Portal",
    description: "Simplify workflows with secure tools to upload notes, manage patient profiles, and track daily tasks efficiently.",
    icon: <FaStethoscope />
  },
  {
    title: "Secure OAuth Login",
    description: "Enhance security with seamless Single Sign-On options, currently supporting Google, for both doctors and patients.",
    icon: <FaLock />
  },
  {
    title: "Audio Upload & Transcription",
    description: "Enable on-the-go documentation with audio uploads that convert to text and structured insights for easy analysis.",
    icon: <FaMicrophone />
  },
  {
    title: "AI Chatbot Support",
    description: "Receive instant assistance with an AI chatbot that answers questions, provides reminders, and offers personalized advice.",
    icon: <FaRobot />
  }
 ];

 const handleDoctorLogin = () => {
   navigate("/doctor-login");
 };

 const handlePatientLogin = () => {
   navigate("/patient-login");
 };

 const handleCreateAccount = () => {
   navigate("/signUp");
 };

 const handleBack = () => {
   setVisibleForm(null);
 };

 const handleSubmit = (formType) => {
   setIsAuthenticating(true); 
   setTimeout(() => {
     if (formType === "doctor") {
       navigate("/doctor-login");
     } else if (formType === "patient") {
       navigate("/patient-login");
     }
   }, 2000); 
 };

 const handleMouseEnter = () => {
   const audio = audioRef.current;
   audio.currentTime = 0; 
   audio.play(); 
   audio.loop = true;
 };

 const handleMouseLeave = () => {
   const audio = audioRef.current;
   audio.pause(); 
   audio.currentTime = 0; 
   audio.loop = false;
 };

 const nextSlide = () => {
   setCurrentSlide((prev) => (prev + 1) % services.length);
 };

 const prevSlide = () => {
   setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
 };

 //auto-advance carousel
 useEffect(() => {
   const timer = setInterval(() => {
     nextSlide();
   }, 3000); //slides every 3 seconds

   return () => clearInterval(timer);
 }, []);

 

 return (
   <ChakraProvider theme={theme}>
     <Box
       position="relative"
       minHeight="100vh"
       width="100vw"
       backgroundColor="#f1f8ff"
       overflowY="auto" 
       backgroundImage="url('https://static.vecteezy.com/system/resources/previews/015/309/491/non_2x/heart-rate-pulse-free-png.png')" // Replace with your image path
      backgroundSize="175px" // Ensures the image covers the entire area
      backgroundPosition="center" // Centers the image
      backgroundRepeat="no-repeat" // Prevents repeating the image
      backgroundAttachment="fixed" // Keeps the image fixed during scroll
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
           backgroundColor="#f1f8ff"
           zIndex="999"
         >
           <Text fontSize="4xl" color="#00366d">
             Authenticating...
           </Text>
         </Box>
       )}

       <Box
         display="flex"
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
         width="100%"
         minHeight="100vh" 
         backgroundColor="#f1f8ff"
         pl="4%"
       >
         <Box display="flex" flexDirection="column" p={8}>
           <Heading fontSize="6xl" color="#00366d" mb="0">
             A Place Where Care Meets Clarity...
           </Heading>

           <Text fontSize="2xl" color="#335d8f" mt="4">
            Helping doctors and patients stay informed and proactive.
           </Text>

           <Box display="flex" gap="4" mt="8">
             <Button
               colorScheme="teal"
               onClick={handleDoctorLogin}
               bg="#335d8f"
               color="white"
               size="md"
               borderColor="#f1f8ff"
               borderWidth="2px"
               _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
               transition="all 0.3s"
             >
               Login as Doctor
             </Button>

             <Button
               colorScheme="teal"
               onClick={handlePatientLogin}
               bg="#f1f8ff"
               color="#00366d"
               size="md"
               _hover={{ bg: "#e6eef7", color: "#335d8f" ,boxShadow: "2xl" }}
               borderColor="#f1f8ff"
               borderWidth="2px"
               transition="all 0.3s"
             >
               Login as Patient
             </Button>
           </Box>

           <Text
            fontSize="xl"
            color="#4d7098"
            cursor="pointer"
            mt="4"
          >
            Don't have an account? Click here to {" "}
            <Text
              as="span"
              color="#4d7098"
              textDecoration="underline"
              _hover={{ color: "#2b4d66" }}
              onClick={handleCreateAccount}
            >
              sign up!
            </Text>
          </Text>
         </Box>

         <Box>
           <audio ref={audioRef} src={heartBeatSound} />

           <Image
             src={pulseHeart}
             alt="Pulse Heart"
             boxSize="700px"
             objectFit="contain"
             mr="20"
             className="pulse-animation"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
           />
         </Box>
       </Box>

       <Box display="flex" flexDirection="column" alignItems="center" mt="8">
         <Heading fontSize="4xl" color="#00366d" mb="4">
           Our Services
         </Heading>
         
         {/* Carousel Container */}
         <Box position="relative" width="100%" maxWidth="1200px" px="8">
           {/* Navigation Buttons */}
           <IconButton
             icon={<FaChevronLeft />}
             onClick={prevSlide}
             position="absolute"
             left="0"
             top="50%"
             transform="translateY(-50%)"
             zIndex="2"
             bg="rgba(255, 255, 255, 0.8)"
             _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
           />
           
           <IconButton
             icon={<FaChevronRight />}
             onClick={nextSlide}
             position="absolute"
             right="0"
             top="50%"
             transform="translateY(-50%)"
             zIndex="2"
             bg="rgba(255, 255, 255, 0.8)"
             _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
           />

           {/*ServicesCarousel component */}
           <ServicesCarousel 
             currentSlide={currentSlide}
             services={services}
           />
         </Box>

         <Heading fontSize="4xl" color="#00366d" mt="8" mb="4">
           Our Team
         </Heading>
         
         {/*TeamSection component */}
         <TeamSection />
       </Box>

       <Footer />
     </Box>
   </ChakraProvider>

   
 );
};

export default Home;