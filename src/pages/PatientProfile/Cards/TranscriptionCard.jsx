
import { Card, CardHeader, CardBody, Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";

function TranscriptionCard() {
  return (
    <Card width="100%" height="100%" border="1px solid" borderColor="gray.300" shadow="lg" borderRadius="md">
      <CardHeader
        p="4"
        fontWeight="bold"
        textAlign="center"
        fontSize="xl"
        textDecoration="underline"
        bg="gray.100"
      >
        Transcriptions / Summary
      </CardHeader>

      <CardBody p={6}>
        <Box>
          <Text fontWeight="bold">Meeting Transcriptions:</Text>
          <UnorderedList>
            <ListItem>October 10th, 2024: Discussion on health improvement.</ListItem>
            <ListItem>October 15th, 2024: Follow-up on medication intake.</ListItem>
          </UnorderedList>
        </Box>
      </CardBody>
    </Card>
  );
}

export default TranscriptionCard;
