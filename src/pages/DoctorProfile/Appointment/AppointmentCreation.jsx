import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

// Predefined patient data
const patients = [
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
  { value: "michael-jordan", label: "Michael Jordan" },
  { value: "sarah-connor", label: "Sarah Connor" },
];

function AppointmentCreation() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!selectedPatient || !date || !time || !description) {
      alert("Please fill out all fields");
      return;
    }

    const newAppointment = {
      patient: selectedPatient.label,
      date,
      time,
      description,
    };

    console.log("New Appointment:", newAppointment);

    // After creating the appointment, navigate back to the appointments page
    navigate("/doctor-profile/appointments");
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Create New Appointment
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="patient" mb={4}>
          <FormLabel>Select Patient</FormLabel>
          <Select
            value={selectedPatient}
            onChange={setSelectedPatient}
            options={patients}
            placeholder="Select a patient"
          />
        </FormControl>

        <FormControl id="date" mb={4}>
          <FormLabel>Appointment Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select appointment date"
          />
        </FormControl>

        <FormControl id="time" mb={4}>
          <FormLabel>Appointment Time</FormLabel>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Select appointment time"
          />
        </FormControl>

        <FormControl id="description" mb={4}>
          <FormLabel>Appointment Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter appointment details"
          />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Create Appointment
        </Button>
      </form>
    </Box>
  );
}

export default AppointmentCreation;
