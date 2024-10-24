import React from "react";
import {
  Box,
  VStack,
  HStack,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { IoIosLogOut } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";

const DoctorSidePanel = () => {
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
        pt="45%"
        spacing={5}
        align="start"
        flexGrow={1}
        w="100%"
      >
        {/* Home */}
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
          <ChakraLink as={ReactRouterLink} to="/doctor-home" fontWeight="bold">
            Home
          </ChakraLink>
        </HStack>

        {/* Overview */}
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
          <ChakraLink as={ReactRouterLink} to="/doctor-overview" fontWeight="bold">
            Overview
          </ChakraLink>
        </HStack>

        {/* Appointments */}
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
          <ChakraLink as={ReactRouterLink} to="/doctor-appointments" fontWeight="bold">
            Appointments
          </ChakraLink>
        </HStack>

        {/* Patients */}
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
          <ChakraLink as={ReactRouterLink} to="/doctor-patients" fontWeight="bold">
            Patients
          </ChakraLink>
        </HStack>

        <Spacer /> {/* Pushes the items below to the bottom */}
      </VStack>

      {/* Grouped Box for Settings and Log Out */}
      <Box
        border="1px"
        borderColor="whiteAlpha.300"
        w="100%"
        p={4}
        mt={6} // Adds padding on top
      >
        {/* Settings */}
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
          <ChakraLink as={ReactRouterLink} to="/doctor-settings" fontWeight="bold">
            Settings
          </ChakraLink>
        </HStack>

        {/* Log Out */}
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
      </Box>
    </Box>
  );
};

export default DoctorSidePanel;
