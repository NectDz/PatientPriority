import {
  ChakraProvider,
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Icon,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  FaUserFriends,
  FaUserMd,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa"; // React icons for custom icons
import { useAuth } from "../../Context/AuthContext"; // Import useAuth to access the logout function
import { useNavigate } from "react-router-dom"; // To navigate after logout

function DoctorProfile() {
  const { logout } = useAuth(); // Access the logout function from AuthContext
  const navigate = useNavigate(); // To navigate after logging out

  const handleLogout = async () => {
    try {
      await logout(); // Perform the logout
      navigate("/"); // Redirect to login page after logout
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
          {/* Top Side Panel Items */}
          <Flex flexDirection="column" gap={8} align="start">
            <Box as="button" display="flex" alignItems="center" gap="4">
              <Icon as={HamburgerIcon} />
              <Text>Home</Text>
            </Box>

            <Box as="button" display="flex" alignItems="center" gap="4">
              <Icon as={HamburgerIcon} />
              <Text>Patients</Text>
            </Box>

            <Box as="button" display="flex" alignItems="center" gap="4">
              <Icon as={HamburgerIcon} />
              <Text>Appointments</Text>
            </Box>

            <Box as="button" display="flex" alignItems="center" gap="4">
              <Icon as={HamburgerIcon} />
              <Text>Calendar</Text>
            </Box>
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
          templateColumns="1fr" // Single column for stacking boxes
          gap={6} // Space between boxes
          marginLeft="220px" // To account for the side panel width
          width="calc(100% - 220px)" // Full width minus the side panel space
          pt="60px" // Padding from the top
          px="16" // Horizontal padding
          pb="8" // Padding from the bottom
        >
          {/* First Box - My Day */}
          <Box
            bg="#5AACA8" // Color from the home page's button
            height="200px"
            width="100%"
            borderRadius="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            p={8} // Padding inside the box
          >
            <Heading fontSize="2xl" color="white" mb="4">
              <Icon as={CalendarIcon} mr={2} /> {/* Calendar Icon */}
              My Day
            </Heading>
            <Text fontSize="lg" color="white">
              View your schedule and daily tasks here.
            </Text>
          </Box>

          {/* Second Box - Recent Patients */}
          <Box
            bg="#EFF8F8" // Lighter background from the home page
            height="200px"
            width="100%"
            borderRadius="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            p={8}
          >
            <Heading fontSize="2xl" color="#252B42" mb="4">
              <Icon as={FaUserMd} mr={2} /> {/* Doctor Icon */}
              Recent Patients
            </Heading>
            <Text fontSize="lg" color="#737373">
              See your most recent patient interactions.
            </Text>
          </Box>

          {/* Third Box - My Team */}
          <Box
            bg="#737373" // Darker grey for variety
            height="200px"
            width="100%"
            borderRadius="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            p={8}
          >
            <Heading fontSize="2xl" color="white" mb="4">
              <Icon as={FaUserFriends} mr={2} /> {/* Team Icon */}
              My Team
            </Heading>
            <Text fontSize="lg" color="white">
              Manage and collaborate with your team members.
            </Text>
          </Box>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default DoctorProfile;
