import {
    ChakraProvider,
    Flex,
    Grid,
  } from "@chakra-ui/react";
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
            pt="60px"
            px="16"
            pb="8"
          >
            <Outlet />
          </Grid>
        </Flex>
      </ChakraProvider>
    );
  }
  
  export default DoctorProfile;
  