import { ChakraProvider, Box, Flex, Link, Stack, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <ChakraProvider>
      <Box position="fixed" top="0" width="100%" zIndex="100" bg="transparent">
        <Flex as="nav" justify="left" py={4} px={8}>
          <Stack direction="row" spacing={8} align="center">
            <Link
              href="/"
              _hover={{ textDecoration: "none", color: "teal.500" }}
            >
              <Text fontSize="lg" fontWeight="bold">
                PatientPriority
              </Text>
            </Link>
            <Link
              href="/team"
              _hover={{ textDecoration: "none", color: "teal.500" }}
            >
              <Text fontSize="lg" fontWeight="bold">
                Team
              </Text>
            </Link>
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default Navbar;
