import {
    Card,
    CardHeader,
    CardBody,
    Box,
    Text,
  } from "@chakra-ui/react";
  
  function CareTeamCard() {
    return (
      <Card width="100%" height="100%" border="1px solid" borderColor="gray.300">
        <CardHeader
          p="0"
          fontWeight="bold"
          textAlign="center"
          fontSize="x-large"
          textDecoration="underline"
        >
          Care Team and Providers
        </CardHeader>
  
        <CardBody display="flex" maxHeight="400px" overflow="auto" pt="20px" >
          <Box p="4">
            <Text> blah blah blah </Text>
            
          </Box>
        </CardBody>
      </Card>
    );
  }
  
  export default CareTeamCard;
  