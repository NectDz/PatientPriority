// import React, { useState, useEffect } from "react";
// import { Box, IconButton, VStack, HStack, Link, Text } from "@chakra-ui/react";
// import { HamburgerIcon, InfoIcon, SettingsIcon } from "@chakra-ui/icons"; // import Chakra UI icons

// const SidePanel = ({ onToggleMaximize, scrollToSection}) => {
//   // onToggleMaximize is the prop that the child parent recieved
//   const [isMaximized, setIsMaximized] = useState(false);
//   // isMaximized is the current local state value
//   // setIsMaximized is the function to update the state value
//   // false is the initial value for isMaximized

//   // this is a function that calls the setIsMaximized function and passes the value !isMaximized which updates the state of isMaximized
//   const toggleMaximize = () => {
//     setIsMaximized(!isMaximized);
//   };

//   // handles side effects, renders when component mounts, and then continues to render if any value in in dependency array changed from last render
//   useEffect(() => {
//     // code we want to run
//     // calls the onToggleMaximize prop (aka handleToggleMaximize from parent component) when local isMaximized value changes
//     onToggleMaximize(isMaximized); // basically calling -> handleToggleMaximize(isMaximized)
//     // the local isMaximized state becomes the "value" in handleToggleMaximize function
//   }, [isMaximized, onToggleMaximize]); // dependancy array: what the useEffect should listen to, to run the code;
//   // onToggleMaximize isn't really needed bc it's not a value but its best practice to add it

//   return (
//     <Box
//       as="nav"
//       width={isMaximized ? "220px" : "70px"}
//       height="100vh"
//       bg="gray.800"
//       color="white"
//       display="flex"
//       flexDirection="column"
//       alignItems="flex-start"
//       paddingLeft="17px"
//       transition="width 0.5s ease"
//       position="fixed"
//       onMouseEnter={toggleMaximize} // calls function toggleMaximize which would make the value of isMaximized true
//       onMouseLeave={toggleMaximize} // when the mouse leaves, isMaximized becomes false again
//     >
//       <VStack pt="60px" spacing={4} align="start">
//         <Text> Panel </Text>

//         <HStack spacing={2}>
//           <IconButton
//             icon={<HamburgerIcon />}
//             aria-label="Profile"
//             variant="ghost"
//             colorScheme="whiteAlpha"
//           />
//           {isMaximized && (
//             <Link onClick={()=>{scrollToSection("profile-card")}}>Profile</Link> //the string is the ID that will get returned of the section to scroll to
//           )}
//         </HStack>

//         <HStack spacing={2}>
//           <IconButton
//             icon={<HamburgerIcon />}
//             aria-label="Overview"
//             variant="ghost"
//             colorScheme="whiteAlpha"
//           />
//           {isMaximized && (
//             <Link onClick={()=>{scrollToSection("overview-card")}}>Overview</Link>
//           )}
//         </HStack>

//         <HStack spacing={2}>
//           <IconButton
//             icon={<HamburgerIcon />}
//             aria-label="Settings"
//             variant="ghost"
//             colorScheme="whiteAlpha"
//           />
//           {isMaximized && <Link minW="150px" onClick={()=>{scrollToSection("lab-results-card")}}>Lab Test Results</Link>}
//         </HStack>

//         <HStack spacing={2}>
//           <IconButton
//             icon={<HamburgerIcon />}
//             aria-label="Lab Results"
//             variant="ghost"
//             colorScheme="whiteAlpha"
//           />
//           {isMaximized && (
//             <Link onClick={()=>{scrollToSection("care-team-card")}}> Care Team </Link>
//           )}
//         </HStack>

//         <HStack spacing={2}>
//           <IconButton
//             icon={<HamburgerIcon />}
//             aria-label="Calendar"
//             variant="ghost"
//             colorScheme="whiteAlpha"
//           />
//           {isMaximized && (
//             <Link onClick={()=>{scrollToSection("calendar-card")}}>
//               Integrated Calendar
//             </Link>
//           )}
//         </HStack>

//         <HStack spacing={2}>
//           <IconButton
//             icon={<HamburgerIcon />}
//             aria-label="Medical History"
//             variant="ghost"
//             colorScheme="whiteAlpha"
//           />
//           {isMaximized && (
//             <Link onClick={()=>{scrollToSection("medical-history-card")}}>
//               Medical History
//             </Link>
//           )}
//         </HStack>
//       </VStack>
//     </Box>
//   );
// };

// export default SidePanel;

import React from "react";
import {
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { IoIosLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import {
  Link as ReactRouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FaCalendarAlt, FaFileAlt, FaUserCircle } from "react-icons/fa"; // Icons
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { FaBrain } from "react-icons/fa";
import { FaRobot } from "react-icons/fa"; // New icon for AI Chatbot

const SidePanel = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Function to check if the current link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Box
      as="nav"
      width="14rem"
      height="100vh"
      bg="#0B2545"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      position="fixed"
    >
      <VStack pt="30%" spacing={5} align="start" flexGrow={1} w="100%">
        <HStack
          as={ReactRouterLink} // Make the whole HStack clickable
          to="/patient-profile/home"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer" // Add cursor pointer for the entire area
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={isActive("/patient-profile/home") ? "#2A3B5C" : "transparent"} // Highlight active link
          borderLeft={
            isActive("/patient-profile/home") ? "4px solid white" : "none"
          } // Left border for active link
        >
          <FaHome />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>
            Home
          </Text>
        </HStack>

        <HStack
          as={ReactRouterLink}
          to="/patient-profile/overview"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer"
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={isActive("/patient-profile/overview") ? "#2A3B5C" : "transparent"}
          borderLeft={
            isActive("/patient-profile/overview") ? "4px solid white" : "none"
          }
        >
          <GrOverview />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>
            Overview
          </Text>
        </HStack>

        <HStack
          as={ReactRouterLink}
          to="/patient-profile/reminders-and-appointments"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer"
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={
            isActive("/patient-profile/reminders-and-appointments")
              ? "#2A3B5C"
              : "transparent"
          }
          borderLeft={
            isActive("/patient-profile/reminders-and-appointments")
              ? "4px solid white"
              : "none"
          }
        >
          <FaCalendarAlt />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>
            Appointments
          </Text>
        </HStack>

        <HStack
          as={ReactRouterLink}
          to="/patient-profile/meeting-summaries"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer"
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={
            isActive("/patient-profile/meeting-summaries")
              ? "#2A3B5C"
              : "transparent"
          }
          borderLeft={
            isActive("/patient-profile/meeting-summaries")
              ? "4px solid white"
              : "none"
          }
        >
          <FaRegNoteSticky />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>
            Meeting Summaries
          </Text>
        </HStack>

        <HStack
          as={ReactRouterLink}
          to="/patient-profile/ai-insights"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer"
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={
            isActive("/patient-profile/ai-insights") ? "#2A3B5C" : "transparent"
          }
          borderLeft={
            isActive("/patient-profile/ai-insights")
              ? "4px solid white"
              : "none"
          }
        >
          <FaBrain />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>
            AI Insights
          </Text>
        </HStack>

        {/* AI Chatbot */}
        <HStack
          as={ReactRouterLink}
          to="/patient-profile/ai-chatbot"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer"
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={
            isActive("/patient-profile/ai-chatbot") ? "#2A3B5C" : "transparent"
          }
          borderLeft={
            isActive("/patient-profile/ai-chatbot") ? "4px solid white" : "none"
          }
        >
          <FaRobot />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>
            AI Chatbot
          </Text>
        </HStack>

        <Spacer />
      </VStack>

      <Box
        border="1px"
        borderColor="whiteAlpha.300"
        w="100%"
        mt={6}
        marginBottom="4vh"
      >
        {/* Settings */}
        <HStack
          as={ReactRouterLink}
          to="/patient-profile/settings"
          spacing={4}
          w="97.5%"
          h="3rem"
          px={6}
          cursor="pointer"
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          bg={isActive("/patient-profile/settings") ? "#2A3B5C" : "transparent"}
          borderLeft={
            isActive("/patient-profile/settings") ? "4px solid white" : "none"
          }
        >
          <SettingsIcon />
          <Text fontWeight="bold" _hover={{ textDecoration: "none" }}>Settings</Text>
        </HStack>

        {/* Logout */}
        <HStack
          spacing={4}
          _hover={{
            bg: "#FF2C2C75",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          w="97.5%"
          h="3rem"
          px={6}
          mb={3}
          cursor="pointer" // Make logout clickable anywhere
          onClick={handleLogout}
        >
          <IoIosLogOut />
          <Text
            as={ReactRouterLink}
            to="/"
            fontWeight="bold"
            _hover={{ textDecoration: "none" }}
          >
            Log Out
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default SidePanel;
