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
  Grid,
  InputGroup,
  InputLeftElement,
  Icon,
  Tooltip,
  Progress,
} from '@chakra-ui/react';
import { FaPhoneAlt, FaEnvelope, FaUser } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

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
      <Progress hasStripe value={40} size="md" colorScheme="teal" mb={6} />
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

            <Box mb={6} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>Step 1: Personal Information</Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaUser} />} />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="dob" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={MdDateRange} />} />
                  <Input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                  placeholder="Select gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaPhoneAlt} />} />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaEnvelope} />} />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </InputGroup>
              </FormControl>
            </Grid>

            <Box mt={8} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>Address</Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <FormControl id="street" isRequired>
              <FormLabel>Street</FormLabel>
              <Input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleNestedChange(e, 'address', 'street')}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="city" isRequired>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={(e) => handleNestedChange(e, 'address', 'city')}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="state" isRequired>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={(e) => handleNestedChange(e, 'address', 'state')}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="zip" isRequired>
              <FormLabel>Zip Code</FormLabel>
              <Input
                type="text"
                name="zip"
                value={formData.address.zip}
                onChange={(e) => handleNestedChange(e, 'address', 'zip')}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <Box mt={8} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>Step 2: Insurance Details</Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <FormControl id="insuranceProvider" isRequired>
              <FormLabel>Insurance Provider</FormLabel>
              <Input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="policyNumber" isRequired>
              <FormLabel>Policy Number</FormLabel>
              <Input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="physicianName" isRequired>
              <FormLabel>Primary Care Physician's Name</FormLabel>
              <Input
                type="text"
                name="physicianName"
                value={formData.physicianName}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="physicianPhone" isRequired>
              <FormLabel>Physician's Phone Number</FormLabel>
              <Input
                type="tel"
                name="physicianPhone"
                value={formData.physicianPhone}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <Box mt={8} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>Step 3: Emergency Contact</Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <FormControl id="emergencyContactName" isRequired>
                <FormLabel>Emergency Contact Name</FormLabel>
                <Input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'name')}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
              </FormControl>

              <FormControl id="relationship" isRequired>
                <FormLabel>Relationship to Patient</FormLabel>
                <Select
                  name="relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'relationship')}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                >
                  <option value="mother">Mother</option>
                  <option value="father">Father</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl id="emergencyPhone" isRequired>
                <FormLabel>Emergency Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'phone')}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
              </FormControl>

              <FormControl id="emergencyEmail" isRequired>
                <FormLabel>Emergency Email Address</FormLabel>
                <Input
                  type="email"
                  name="emergencyEmail"
                  value={formData.emergencyContact.email}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'email')}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
              </FormControl>
            </Grid>

            <Box mt={8} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>Step 4: Medical History</Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <FormControl id="conditions">
              <FormLabel>Known Medical Conditions</FormLabel>
              <Textarea
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="medications">
              <FormLabel>Current Medications</FormLabel>
              <Textarea
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="surgeries">
              <FormLabel>Past Surgeries</FormLabel>
              <Textarea
                name="surgeries"
                value={formData.surgeries}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <FormControl id="allergies">
              <FormLabel>Known Allergies</FormLabel>
              <Textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>

            <Box mt={8} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>Step 5: Lifestyle Information</Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <FormControl id="lifestyle" isRequired>
              <FormLabel>Lifestyle & Habits</FormLabel>
              <Select
                name="lifestyle"
                value={formData.lifestyle}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
                placeholder="Select lifestyle habit"
              >
                <option value="non-smoker">Non-smoker</option>
                <option value="smoker">Smoker</option>
                <option value="former-smoker">Former Smoker</option>
              </Select>
            </FormControl>

            <FormControl id="alcoholConsumption" isRequired>
              <FormLabel>Alcohol Consumption</FormLabel>
              <Select
                name="alcoholConsumption"
                value={formData.alcoholConsumption}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
                placeholder="Select alcohol consumption"
              >
                <option value="none">None</option>
                <option value="occasionally">Occasionally</option>
                <option value="frequently">Frequently</option>
              </Select>
            </FormControl>

            <FormControl id="physicalActivity" isRequired>
              <FormLabel>Physical Activity Level</FormLabel>
              <Select
                name="physicalActivity"
                value={formData.physicalActivity}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
                placeholder="Select activity level"
              >
                <option value="sedentary">Sedentary</option>
                <option value="moderatelyActive">Moderately Active</option>
                <option value="active">Active</option>
              </Select>
            </FormControl>

            <FormControl id="diet" isRequired>
              <FormLabel>Dietary Habits</FormLabel>
              <Select
                name="diet"
                value={formData.diet}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
                placeholder="Select diet"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="nonVegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </Select>
            </FormControl>

            <FormControl id="sleep" isRequired>
              <FormLabel>Sleep Quality</FormLabel>
              <Select
                name="sleep"
                value={formData.sleep}
                onChange={handleChange}
                focusBorderColor="teal.400"
                borderRadius="md"
                placeholder="Select sleep quality"
              >
                <option value="poor">Poor</option>
                <option value="average">Average</option>
                <option value="good">Good</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              borderRadius="md"
              bgGradient="linear(to-r, teal.400, teal.500)"
              color="white"
              _hover={{ bgGradient: 'linear(to-r, teal.500, teal.600)' }}
              mt={8}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default AddPatient;
