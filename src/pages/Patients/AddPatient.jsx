import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

  const auth = getAuth();
  const user = auth.currentUser;

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

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(Boolean).length;
    return (filledFields / totalFields) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const doctorEmail = user.email;

        // Get doctor's ID based on their email in Firestore
        const doctorQuery = query(
          collection(db, "doctor"),
          where("email", "==", doctorEmail)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorId = doctorSnapshot.docs[0].data().id;

          // Add doctor_id to patient data
          const newPatientData = { ...formData, doctor_id: doctorId };

          // Save new patient to Firestore in "patients" collection
          await addDoc(collection(db, "patients"), newPatientData);

          console.log("Patient data saved successfully!", newPatientData);
        } else {
          console.error("Doctor not found in database");
        }
      }
    } catch (error) {
      console.error("Error saving patient data:", error);
    }
  };

  return (
    <Container maxW="xl" py={10}>
      <Progress hasStripe value={calculateProgress()} size="md" colorScheme="teal" mb={6} />
      
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
        <Heading mb={8} textAlign="center" fontSize="2xl" color="teal.600">
          Add New Patient
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            {/* Patient Personal Information */}
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="dob" isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </FormControl>

            {/* Add other fields similar to above */}

            <Button type="submit" colorScheme="teal" width="full" mt={8}>
              Save Patient
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}

export default AddPatient;
