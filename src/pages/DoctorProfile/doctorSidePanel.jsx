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
import { FaHome, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { Link as ReactRouterLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const DoctorSidePanel = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  //made this into an array
  const menuItems = [
    { label: "Home", icon: FaHome, to: "/doctor-profile/home" },
    { label: "Appointments", icon: FaCalendarAlt, to: "/doctor-profile/appointments" },
    { label: "Patients", icon: FaUserCircle, to: "/doctor-profile/patients" },
    { label: "Settings", icon: SettingsIcon, to: "/doctor-profile/doctor-settings" },
  ];

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
        {menuItems.slice(0, -1).map((item) => (
          <ChakraLink
            as={ReactRouterLink}
            to={item.to}
            key={item.label}
            w="100%"
            _hover={{ textDecoration: "none" }}
          >
            <HStack
              spacing={4}
              w="97.5%"
              h="3rem"
              px={6}
              bg={location.pathname === item.to ? "#2A3B5C" : "transparent"}
              borderLeft={location.pathname === item.to ? "4px solid #FFFFFF" : "none"}
              _hover={{
                bg: "#2A3B5C",
                transform: "scale(1.05)",
                transition: "0.2s",
              }}
            >
              <item.icon />
              <Box fontWeight="bold">{item.label}</Box>
            </HStack>
          </ChakraLink>
        ))}
        <Spacer />
      </VStack>

      <Box
        border="1px"
        borderColor="whiteAlpha.300"
        w="100%"
        mt={6}
      >
        <ChakraLink
          as={ReactRouterLink}
          to="/doctor-profile/doctor-settings"
          w="100%"
          _hover={{ textDecoration: "none" }}
        >
          <HStack
            spacing={4}
            w="97.5%"
            h="3rem"
            px={6}
            bg={location.pathname === "/doctor-profile/doctor-settings" ? "#2A3B5C" : "transparent"}
            borderLeft={location.pathname === "/doctor-profile/doctor-settings" ? "4px solid #FFFFFF" : "none"}
            _hover={{
              bg: "#2A3B5C",
              transform: "scale(1.05)",
              transition: "0.2s",
            }}
          >
            <SettingsIcon />
            <Box fontWeight="bold">Settings</Box>
          </HStack>
        </ChakraLink>

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
          onClick={handleLogout}
          mb={2}
          cursor="pointer" // Add this line
        >
          <IoIosLogOut />
          <Box fontWeight="bold">Log Out</Box>
        </HStack>

      </Box>
    </Box>
  );
};

export default DoctorSidePanel;