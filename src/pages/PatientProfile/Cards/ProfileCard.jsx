import { Card, CardHeader, CardBody, Image, Box, Text } from "@chakra-ui/react";
import profilePic from "../../../assets/profile pic.png";

function ProfileCard() {
  return (
    <Card width="100%" height="100%" border="1px solid" borderColor="gray.300" shadow="lg" borderRadius="8px">
      <CardHeader
        p="4"
        fontWeight="bold"
        textAlign="center"
        fontSize="xl"
        textDecoration="underline"
        bg="#134074"
        borderRadius="8px 8px 0px 0px"
        color="white"
      >
        Profile
      </CardHeader>

      <CardBody p={6} bg="#F0F0EE" >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={profilePic}
            alt="Profile Image"
            boxSize="120px"
            borderRadius="full"
            mb={4}  // Adds margin below the image
          />
          <Box>
            <Text><strong>Name:</strong> Princess Lulu</Text>
            <Text><strong>Height:</strong> 4'11</Text>
            <Text><strong>Weight:</strong> 120 lbs</Text>
            <Text><strong>Age:</strong> 20</Text>
            <Text><strong>Address:</strong> 1125 Yippee Road</Text>
            <Text><strong>Phone:</strong> 123-456-7890</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}

export default ProfileCard;
