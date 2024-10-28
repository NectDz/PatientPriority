import { Card, CardHeader, CardBody, Image, Box, Text } from "@chakra-ui/react";
import profilePic from "../../../assets/profile_pic.png";

function ProfileCard() {
  return (
    <Card width="100%" height="100%" bg="#ffffff" shadow="md" borderRadius="12px">
      <CardHeader
        p="4"
        fontWeight="bold"
        textAlign="center"
        fontSize="xl"
        bg="#3A506B"
        color="white"
        borderRadius="12px 12px 0px 0px"
      >
        Profile
      </CardHeader>
      <CardBody p={6}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={profilePic}
            alt="Profile Image"
            boxSize="100px"
            borderRadius="full"
            mb={4}
          />
          <Box textAlign="center">
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
