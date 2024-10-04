import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import SidePanel from "./sidePanel";
import { useState } from "react";
// instead of making all the cards on this file, keep it better organized by making each cards in another file
import ProfileCard from "./Cards/ProfileCard";

//
import profileData from "../../PatientData/profileData";

function PatientProfile() {
  // manage state of isMaximized
  const [isMaximized, setIsMaximized] = useState(false);
  // this is a function that updates the value of isMaximized
  const handleToggleMaximize = (value) => {
    setIsMaximized(value);
  };

  return (
    <ChakraProvider>
      <Flex pt="50px" minH="100vh">
        <SidePanel onToggleMaximize={handleToggleMaximize} 
          // send as prop to child component
          // this is to lift state of isMaximized from child component to parent component 
        />

        {/* where all the cards will go */}
        <Box
          display="flex"
          minW="fit-content"
          p="8"
          pt="60px"
          flexGrow="1"
          transition="margin-left 0.5s ease" // Smooth transition for margin
          marginLeft={isMaximized ? "200px" : "70px"} // Adjust the margin based on panel state
        >
          <ProfileCard profileData={profileData} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientProfile;
