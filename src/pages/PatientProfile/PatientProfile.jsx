import { ChakraProvider, Box, Flex, Text } from "@chakra-ui/react";
import styles from "./styles"; // Importing the styles from the separate file
import SidePanel from "./sidePanel";
// import Navbar from "../../Components/Navbar";

function PatientProfile() {
  return (
    <ChakraProvider>

      <Flex sx={styles.container}>
        {/* Side Panel */}
        <SidePanel/>

        {/* Main Content Area */}
        <Box sx={styles.mainContent}>
          <Text fontSize="xl"> teehee! </Text>
        </Box>
      </Flex>
      
    </ChakraProvider>
  );
}

export default PatientProfile;
