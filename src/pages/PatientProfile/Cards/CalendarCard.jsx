import { Card, CardHeader, CardBody, Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";

  function CalendarCard() {
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
          Reminders / Appointments
        </CardHeader>
  
        <CardBody p={6} bg="#F0F0EE">
          <Box>
            <Text fontWeight="bold">Upcoming Appointments:</Text>
            <UnorderedList>
              <ListItem>October 20th, 2024: General Checkup</ListItem>
              <ListItem>November 1st, 2024: Blood Test Follow-up</ListItem>
              <ListItem>December 5th, 2024: Vaccination</ListItem>
            </UnorderedList>
          </Box>
        </CardBody>
      </Card>
    );
  }
  
  export default CalendarCard;
  