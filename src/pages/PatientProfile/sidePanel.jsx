import React, { useState } from "react";
import { Box, IconButton, VStack, Text, HStack } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { HamburgerIcon, InfoIcon, SettingsIcon } from "@chakra-ui/icons"; // Import Chakra UI icons

const SidePanel = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <Box
      as="nav"
      width={isMaximized ? "200px" : "70px"} // Adjust width based on state
      height="100vh"
      bg="gray.800"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems={isMaximized ? "flex-start" : "center"}
      transition="width 0.4s ease"
      pt="100px"
      position="relative" // Allow absolute positioning of the button
    >
      <IconButton
        aria-label="Toggle maximize"
        icon={isMaximized ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        onClick={toggleMaximize}
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.600" }}
        mb={4}
        position="absolute" // Position it absolutely
        top="10px" // Adjust vertical position
        left={isMaximized ? "140px" : "10px"} // Move to the right when maximized
        transition="left 0.4s ease" // Smooth transition for the button
        marginTop="40px"
      />

      <VStack spacing={4} align="start"> {/* Align to the start when maximized */}
        <HStack spacing={2}>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Menu"
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          {isMaximized && <Text>Menu</Text>}
        </HStack>

        <HStack spacing={2}>
          <IconButton
            icon={<InfoIcon />}
            aria-label="Profile"
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          {isMaximized && <Text>Profile</Text>}
        </HStack>

        <HStack spacing={2}>
          <IconButton
            icon={<SettingsIcon />}
            aria-label="Settings"
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          {isMaximized && <Text>Settings</Text>}
        </HStack>
      </VStack>
    </Box>
  );
};

export default SidePanel;
