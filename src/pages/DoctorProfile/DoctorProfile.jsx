import {
  ChakraProvider,
  Flex,
  Grid,
  Box,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

import { Outlet } from "react-router-dom";
import DoctorSidePanel from "./doctorSidePanel"; // Import the new side panel component

function DoctorProfile() {
  return (
    <ChakraProvider>
      <Flex minH="100vh" bg="#EEF4ED">
        {/* Side Panel */}
        <DoctorSidePanel />

        {/* Main Content Area */}
        <Grid
          templateColumns="1fr"
          gap={6}
          marginLeft="220px"
          width="calc(100% - 220px)"
          pt="11vh"
          px="16"
          pb="8"
        >
          {/* <Box
            bg="#5AACA8"
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
              <Icon as={CalendarIcon} mr={2} />
              My Day
            </Heading>
            <Text fontSize="lg" color="white">
              View your schedule and daily tasks here.
            </Text>
          </Box> */}

          {/* Outlet for nested routes */}
          <Outlet />
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default DoctorProfile;
