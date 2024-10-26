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
  Textarea, //without correct import screen turns white
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
    setFormData({ ...formData, [name]: value }); //handles form data change for each field
  };

  const handleNestedChange = (e, parentField, childField) => {
    //  //update specific nested field in the for,
    setFormData((prevData) => ({
      //keep all existing field
      ...prevData,
      //target specific parentField like 'contactInfo'
      [parentField]: {
        ...prevData[parentField], //keep all existing fields within the parentField to preserve the current data
        [childField]: e.target.value, //update specific childField within parentField with the new value
      },
    }));
  };

  const generateCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
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

    const code = generateCode();

    // Map fields to the patient_codes structure
    const patientCodeData = {
      code,
      doctor_id: doctorId, // or any unique ID for the doctor
      email: formData.email,
      firstName: formData.firstName.split(" ")[0] || "", // assumes first part is first name
      lastName: formData.firstName.split(" ")[1] || "", // assumes second part is last name
    };

    try {
      // Push data to Firebase
      await addDoc(collection(db, "patient_codes"), patientCodeData);
      console.log("Patient Code Added:", patientCodeData);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Container maxW="xl" py={10}>
      <Progress
        hasStripe
        value={calculateProgress()}
        size="md"
        colorScheme="teal"
        mb={6}
      />

      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
        <Heading mb={8} textAlign="center" fontSize="2xl" color="teal.600">
          Add New Patient
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Box mb={6} bg="gray.100" p={4} borderRadius="md">
              <Heading fontSize="lg" color="teal.500" mb={4}>
                Step 1: Personal Information
              </Heading>
              <Divider borderColor="gray.300" />
            </Box>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaUser} />} />
                  <Input
                    type="text"
                    name="firstName" //when it was "name" it game me an error
                    value={formData.firstName}
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

              {/* Address Section */}
              <FormControl id="street" isRequired>
                <FormLabel>Street</FormLabel>
                <Input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={(e) => handleNestedChange(e, "address", "street")}
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
                  onChange={(e) => handleNestedChange(e, "address", "city")}
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
                  onChange={(e) => handleNestedChange(e, "address", "state")}
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
                  onChange={(e) => handleNestedChange(e, "address", "zip")}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
              </FormControl>

              {/* Insurance Details */}
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

              {/* Emergency Contact */}
              <FormControl id="emergencyContactName" isRequired>
                <FormLabel>Emergency Contact Name</FormLabel>
                <Input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContact.name}
                  onChange={(e) =>
                    handleNestedChange(e, "emergencyContact", "name")
                  }
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
              </FormControl>

              <FormControl id="relationship" isRequired>
                <FormLabel>Relationship to Patient</FormLabel>
                <Select
                  name="relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    handleNestedChange(e, "emergencyContact", "relationship")
                  }
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
                  onChange={(e) =>
                    handleNestedChange(e, "emergencyContact", "phone")
                  }
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
                  onChange={(e) =>
                    handleNestedChange(e, "emergencyContact", "email")
                  }
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
              </FormControl>

              {/* Medical History */}
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

              {/* Lifestyle Information */}
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
                  placeholder="Select dietary habits"
                >
                  <option value="balanced">Balanced</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                  <option value="low-carb">Low Carb</option>
                </Select>
              </FormControl>
            </Grid>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              borderRadius="md"
              mt={8}
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}

export default AddPatient;
