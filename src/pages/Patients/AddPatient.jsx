import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Input,
  Select,
  FormControl,
  FormLabel,
  Container,
  Textarea,
  Divider,
  useBreakpointValue,
} from '@chakra-ui/react';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    insuranceProvider: '',
    policyNumber: '',
    physicianName: '',
    physicianAddress: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    physicianPhone: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
    conditions: '',
    medications: '',
    surgeries: '',
    allergies: '',
    lifestyle: '',
    alcoholConsumption: '',
    physicalActivity: '',
    diet: '',
    sleep: '',
    vaccination: '',
    mentalHealth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Patient Data:', formData);
  };

  const containerMaxWidth = useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" });

  return (
    <Container 
      maxW={containerMaxWidth}  
      py={10} 
      bg="gray.50" 
      borderRadius="lg" 
      boxShadow="lg" 
      px={{ base: 6, md: 10 }}  
      mt={24}  
      mb={12}
    >
      <Box 
        bg="white" 
        p={{ base: 6, md: 10 }} 
        borderRadius="lg" 
        boxShadow="lg"
        transition="all 0.3s ease" 
        _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
      >
        <Heading mb={8} textAlign="center" fontSize="2xl" color="teal.600">
          Add New Patient
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
