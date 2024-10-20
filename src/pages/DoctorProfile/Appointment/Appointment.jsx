import React from "react";
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import {
  Outlet,
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function Appointments() {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-10-20",
      time: "10:00 AM",
      description: "Routine checkup",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-10-21",
      time: "1:30 PM",
      description: "Follow-up for lab results",
    },
  ];

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Appointments
      </Heading>
      {appointments.length > 0 ? (
        <VStack spacing={6} align="stretch">
          {appointments.map((appointment) => (
            <Box
              key={appointment.id}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
            >
              <Heading as="h2" size="md" mb={2}>
                {appointment.patientName}
              </Heading>
              <Text>Date: {appointment.date}</Text>
              <Text>Time: {appointment.time}</Text>
              <Text>Description: {appointment.description}</Text>
              <Button colorScheme="teal" mt={4}>
                View Details
              </Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No appointments scheduled.</Text>
      )}
      <Box display="flex" justifyContent="center" mt={8} mb={6}>
        <Link to="/doctor-profile/appointments/create-appointment">
          <Button colorScheme="teal" display="flex" alignItems="center" gap="4">
            New Appointment
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Appointments;
