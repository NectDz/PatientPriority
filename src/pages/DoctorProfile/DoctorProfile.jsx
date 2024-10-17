import { ChakraProvider, Box, Flex, Grid } from "@chakra-ui/react";

function DoctorProfile() {
  return (
    <ChakraProvider>
      <Flex pt="50px" minH="100vh" bg="#EFF8F8">
        {/* Main Content Area */}
        <Grid
          templateColumns="1fr"  // Single column to stack boxes
          gap={6}  // Space between boxes
          marginLeft="220px"  // Account for side panel width
          width="calc(100% - 220px)"  // Full width minus the side panel space
          placeItems="center"  // Center boxes horizontally
          pt="60px"  // Padding on top
        >
          {/* Three rectangular boxes with rounded edges */}
          <Box bg="teal.200" height="250px" width="100%" borderRadius="20px" />
          <Box bg="teal.200" height="250px" width="100%" borderRadius="20px" />
          <Box bg="teal.200" height="250px" width="100%" borderRadius="20px" />
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default DoctorProfile;
