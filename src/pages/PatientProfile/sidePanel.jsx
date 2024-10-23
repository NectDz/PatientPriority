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

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons"; // Chakra icons
import { IoIosLogOut } from "react-icons/io"; // Import the Log Out icon from react-icons
import { FaHome } from "react-icons/fa";

import { Link as ReactRouterLink } from "react-router-dom";

const SidePanel = () => {
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
      <VStack
        pt="30%"
        spacing={5}
        align="start"
        flexGrow={1}
        marginBottom="8vh"
        w="100%"
      >
        <HStack
          spacing={4}
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)",
            transition: "0.2s",
          }}
          w="97.5%"
          h="3rem"
          px={6}
        >
          <FaHome />
          <ChakraLink as={ReactRouterLink} to="/patient-profile" fontWeight="bold">
            Home
          </ChakraLink>
        </HStack>

        <HStack
          spacing={4}
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)", 
            transition: "0.2s",
          }}
          w="97.5%"
          h="3rem"
          px={6} 
        >
          <HamburgerIcon />
          <ChakraLink as={ReactRouterLink} to="/patient-health-records" fontWeight="bold">
            Overview
          </ChakraLink>
        </HStack>

        <HStack
          spacing={4}
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)", 
            transition: "0.2s", 
          }}
          w="97.5%"
          h="3rem"
          px={6} 
        >
          <HamburgerIcon />
          <ChakraLink as={ReactRouterLink} to="/lab-test-results" fontWeight="bold" noOfLines={1}>
            Reminders & Appointments
          </ChakraLink>
        </HStack>

        <HStack
         spacing={4}
         _hover={{
          bg: "#2A3B5C",
           transform: "scale(1.05)", 
           transition: "0.2s", 
         }}
         w="97.5%"
         h="3rem"
         px={6} 
        >
          <HamburgerIcon />
          <ChakraLink as={ReactRouterLink} to="/care-team" fontWeight="bold">
            Meeting Summaries
          </ChakraLink>
        </HStack>

        <HStack
          spacing={4}
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)", 
            transition: "0.2s", 
          }}
          w="97.5%"
          h="3rem"
          px={6} 
        >
          <HamburgerIcon />
          <ChakraLink as={ReactRouterLink} to="/ai-insights" fontWeight="bold">
            AI Insights
          </ChakraLink>
        </HStack>

        <Spacer />

        {/* Settings Section */}
        <HStack
          spacing={4}
          _hover={{
            bg: "#2A3B5C",
            transform: "scale(1.05)", 
            transition: "0.2s", 
          }}
          w="97.5%"
          h="3rem"
          px={6} 
        >
          <SettingsIcon />
          <ChakraLink fontWeight="bold">Settings</ChakraLink>
        </HStack>

        {/* Log Out Section */}
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
        >
          <IoIosLogOut />
          <ChakraLink as={ReactRouterLink} to="/" fontWeight="bold">
            Log Out
          </ChakraLink>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SidePanel;
