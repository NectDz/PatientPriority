import { ChakraProvider, Box, Flex, Link, Stack, Text } from "@chakra-ui/react";

function Navbar() {
  return (
    <ChakraProvider>
      <Box position="fixed" top="0" width="100%" zIndex="100" bg="white" boxShadow="lg" p={4} borderRadius="md">
        <Flex as="nav" justify="center" py={4} px={8}>
          <Stack direction="row" spacing={8} align="center">
            <Link
              href="/"
              _hover={{ textDecoration: "none", color: "teal.500" }}
            >
              <Text
                fontSize="6xl"
                fontWeight="bold"
                color="#5AACA8"
                sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }} //text shadow!!
              >
                PatientPriority
              </Text>
            </Link>
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default Navbar;