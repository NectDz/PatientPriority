import { ChakraProvider, Flex, Grid } from "@chakra-ui/react";
import SidePanel from "./sidePanel";
import { Outlet } from "react-router-dom";

function PatientProfile() {
  return (
    <ChakraProvider>
      <Flex pt="50px" minH="100vh" bg="#FAFAFA">
        {/* <SidePanel scrollToSection={scrollToSection} /> */}
        <SidePanel />
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
          {/* Outlet for nested routes */}
          <Outlet />
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
