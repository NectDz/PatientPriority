// doctorSidePanel.js
import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const DoctorSidePanel = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Box
      bg="gray.800"
      color="white"
      width="220px"
      p="8"
      pt="60px"
      height="100vh"
      position="fixed"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Flex flexDirection="column" gap={8} align="start">
        <Link to="/">
          <Box as="button" display="flex" alignItems="center" gap="4">
            <Icon as={HamburgerIcon} />
            <Text>Home</Text>
          </Box>
        </Link>

        <Link to="/patients">
          <Box as="button" display="flex" alignItems="center" gap="4">
            <Icon as={HamburgerIcon} />
            <Text>Patients</Text>
          </Box>
        </Link>

        <Link to="/doctor-profile/appointments">
          <Box as="button" display="flex" alignItems="center" gap="4">
            <Icon as={HamburgerIcon} />
            <Text>Appointments</Text>
          </Box>
        </Link>

        <Link to="/calendar">
          <Box as="button" display="flex" alignItems="center" gap="4">
            <Icon as={HamburgerIcon} />
            <Text>Calendar</Text>
          </Box>
        </Link>
      </Flex>

      {/* Bottom Signout Button */}
      <Box
        as="button"
        display="flex"
        alignItems="center"
        gap="4"
        onClick={handleLogout}
      >
        <Icon as={FaSignOutAlt} />
        <Text>Sign Out</Text>
      </Box>
    </Box>
  );
};

export default DoctorSidePanel;
