import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Container,
  Grid,
  Progress,
  Icon,
  InputGroup,
  InputLeftElement,
  Divider,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

function AddPatient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    insuranceProvider: "",
    policyNumber: "",
    physicianName: "",
    physicianPhone: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
    },
    conditions: "",
    medications: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDoctorId = async () => {
      if (user) {
        try {
          const doctorEmail = user.email;
          const doctorQuery = query(
            collection(db, "doctor"),
            where("email", "==", doctorEmail)
          );
          const doctorSnapshot = await getDocs(doctorQuery);

          if (!doctorSnapshot.empty) {
            const doctorData = doctorSnapshot.docs[0].data();
            setDoctorId(doctorData.id);
          } else {
            console.error("Doctor not found in database");
          }
        } catch (error) {
          console.error("Error fetching doctor ID:", error);
        }
      }
      setLoading(false);
    };

    fetchDoctorId();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, parentField, childField) => {
  setFormData((prevData) => ({
    ...prevData,
    [parentField]: {
      ...prevData[parentField],
      [childField]: e.target.value
    }
  }));
};


  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(Boolean).length;
    return (filledFields / totalFields) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId) {
      alert("Doctor ID not found. Please try again.");
      return;
    }

    try {
      const newPatientData = { ...formData, doctor_id: doctorId };
      await addDoc(collection(db, "patients"), newPatientData);
      console.log("Patient data saved successfully!", newPatientData);
    } catch (error) {
      console.error("Error saving patient data:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Container maxW="xl" py={10}>
      <Progress hasStripe value={calculateProgress()} size="md" colorScheme="teal" mb={6} />
      
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
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
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaUser} />} />
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaUser} />} />
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
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
              {/* Add remaining fields here as needed */}
            </Grid>

            <Button type="submit" colorScheme="teal" size="lg" borderRadius="md" mt={8}>
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}

export default AddPatient;