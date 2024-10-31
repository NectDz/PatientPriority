import { ChakraProvider, Box, Flex, Link, Stack, Text, Icon } from "@chakra-ui/react";
import { MdLocalHospital } from "react-icons/md"; // Import an icon (e.g., hospital icon)


function Navbar() {
 return (
   <ChakraProvider>
     <Box position="fixed" top="0" width="100%" zIndex="100" bg="white" boxShadow="lg" p={2} borderRadius="md">
       <Flex as="nav" justify="center" py={2} px={8} align="center">
         <Stack direction="row" spacing={8} align="center">
           <Link href="/" _hover={{ textDecoration: "none", color: "teal.500" }} display="flex" alignItems="center">
             <Icon as={MdLocalHospital} w={8} h={8} color="#00366d" mr={2} /> {/* Icon on the left */}
             <Text
               fontSize="4xl"
               fontWeight="bold"
               color="#00366d"
               sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
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



