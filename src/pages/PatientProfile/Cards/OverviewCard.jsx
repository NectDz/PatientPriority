import { Card, CardHeader, CardBody, Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";

function OverviewCard() {
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
        Overview
      </CardHeader>

      <CardBody p={6} bg="#F0F0EE">
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

          {/* <Box>
            <Text fontWeight="bold">Meeting Summaries:</Text>
            <UnorderedList></UnorderedList>
          </Box> */}
        </Box>
      </CardBody>
    </Card>
  );
}

export default OverviewCard;

