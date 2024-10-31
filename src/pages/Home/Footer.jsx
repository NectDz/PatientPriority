import React from "react";
import { Box, Text, Link, Stack, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" position="relative" width="100%">
      {/* Top border line with shorter width and 70% opacity */}
      <Box
        height="2px"
        backgroundColor="rgba(0, 54, 109, 0.5)" // Line color with 70% opacity
        width="80%" // Adjust the width as needed
        margin="0 auto" // Center the line
      />

      <Box
        backgroundColor="#EFF8F8" // Set the background color to #EFF8F8
        color="#00366d"
        py={4}
      >
        <HStack spacing={4} alignItems="center" justifyContent="center">
          <Text>&copy; {new Date().getFullYear()} Patient Priority</Text>
          <Stack direction="row" spacing={8}>
            <Link href="/support" color="#00366d" _hover={{ textDecoration: "underline" }}>
              Support
            </Link>
            <Link href="/contact" color="#00366d" _hover={{ textDecoration: "underline" }}>
              Contact
            </Link>
            <Link href="/about" color="#00366d" _hover={{ textDecoration: "underline" }}>
              About Us
            </Link>
            <Link href="/faq" color="#00366d" _hover={{ textDecoration: "underline" }}>
              FAQ
            </Link>
          </Stack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
