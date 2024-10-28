import { Card, CardHeader, CardBody, Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";

function OverviewCard() {
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
        Overview
      </CardHeader>
      <CardBody p={6}>
        <Box display="flex" justifyContent="space-around">
          <Box>
            <Text fontWeight="bold">Current Health Information:</Text>
            <UnorderedList>
              <ListItem>Patient is 100% healthy</ListItem>
              <ListItem>May be a little coco loco</ListItem>
              <ListItem>Hints of delulu is not the solulu</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Text fontWeight="bold">Current Medications:</Text>
            <UnorderedList>
              <ListItem>Percocet</ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}

export default OverviewCard;
