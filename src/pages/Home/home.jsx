import { ChakraProvider, Box, Heading } from '@chakra-ui/react';

function Home() {
  return (
    <ChakraProvider>
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Heading>Hello World</Heading>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
