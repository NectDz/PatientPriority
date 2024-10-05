import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Text,
  List,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function OverviewCard() {
  return (
    <Card width="100%" height="100%" border="1px solid" borderColor="gray.300">
      <CardHeader
        p="0"
        fontWeight="bold"
        textAlign="center"
        fontSize="x-large"
        textDecoration="underline"
      >
        Overview
      </CardHeader>

      <CardBody display="flex">
        <Box p="2">
          <Text> Current Health Information: </Text>
          <UnorderedList>
            <ListItem> patient is 100% healthy </ListItem>
            <ListItem> may be a little coco loco </ListItem>
            <ListItem> hints of delulu is not the solulu </ListItem>
          </UnorderedList>
        </Box>
        <Box p="2">
          <Text> Current Medications: </Text>
          <UnorderedList>
            <ListItem> Percocet </ListItem>
          </UnorderedList>
        </Box>
        <Box p="2">
          <Text> Meeting Summaries: </Text>
          <UnorderedList> </UnorderedList>
        </Box>
      </CardBody>
    </Card>
  );
}

export default OverviewCard;
