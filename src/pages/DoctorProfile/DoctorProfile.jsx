import {
  ChakraProvider,
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  FaUserFriends,
  FaUserMd,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import {
  useNavigate,
  Outlet,
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function DoctorProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <ChakraProvider>
      <Flex minH="100vh" bg="#EEF4ED">
        {/* Side Panel */}
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

        {/* Main Content Area */}
        <Grid
          templateColumns="1fr"
          gap={6}
          marginLeft="220px"
          width="calc(100% - 220px)"
          pt="60px"
          px="16"
          pb="8"
        >
          <Outlet /> {/* This will render the current route's content */}
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default DoctorProfile;
