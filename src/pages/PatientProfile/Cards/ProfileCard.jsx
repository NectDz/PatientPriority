// ProfileCard.jsx
import { Card, CardHeader, CardBody, Image, Box, Text} from "@chakra-ui/react";
import profilePic from "../../../assets/profile pic.png"

function ProfileCard() {
  return (
    <Card height="fit-content" width="fit-content">

      <CardHeader p="0" paddingRight="150" fontWeight="bold" textAlign="center" fontSize="x-large" textDecoration="underline">
        Profile
      </CardHeader>

      <CardBody display="flex">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image
            src={
              profilePic || "https://via.placeholder.com/150"
            }
            alt="Profile Image"
            boxSize="150px"
            borderRadius="full"
            objectFit="cover"
          />
        </Box>
        <Box p="4">
            {/* just using dummy data for now */}
          <Text>Name: Princess Lulu </Text>
          <Text>Height: 4'11 </Text>
          <Text>Weight: 125 lbs </Text>
          <Text>Age: 20 </Text>
          <Text>Address: 1125 Yippee Road </Text>
          <Text>Phone: 123-456-7890</Text>
        </Box>
      </CardBody>

    </Card>
  );
}

export default ProfileCard;
