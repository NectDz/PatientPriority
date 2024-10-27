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
  FormErrorMessage,
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
import emailjs from "emailjs-com";

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
      firstName: formData.firstName.firstName, 
      lastName: formData.firstName.lastName || "",
    };

    try {
      await addDoc(collection(db, "patient_codes"), patientCodeData);
      console.log("Patient Code Added:", patientCodeData);

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            recipient_email: formData.email,
            firstName: formData.firstName,
            verificationCode: code,
          },
          import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then(
          (result) => {
            console.log("Email sent successfully!", result.text);
          },
          (error) => {
            console.error("Error sending email:", error.text);
          }
        );
    } catch (error) {
      console.error("Error adding document or sending email:", error);
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

            {/* <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}> */}
              <FormControl id="firstName" isRequired isInvalid={formData.firstName && !/^[a-zA-Z]{2,50}$/.test(formData.firstName)}>
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
                    placeholder="Enter first name"
                  />
                </InputGroup>
                {formData.firstName && !/^[a-zA-Z]{2,50}$/.test(formData.firstName) && (
                  <FormErrorMessage>First name must be 2-50 letters.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="lastName" isRequired isInvalid={formData.lastName && !/^[a-zA-Z]{2,50}$/.test(formData.lastName)}>
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
                    placeholder="Enter last name"
                  />
                </InputGroup>
                {formData.lastName && !/^[a-zA-Z]{2,50}$/.test(formData.lastName) && (
                  <FormErrorMessage>Last name must be 2-50 letters.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="dob" isRequired isInvalid={formData.dob && (new Date(formData.dob) >= new Date())}>
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
                {formData.dob && new Date(formData.dob) >= new Date() && (
                  <FormErrorMessage>Date of birth must be in the past.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="gender" isRequired isInvalid={!formData.gender}>
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
                {!formData.gender && (
                  <FormErrorMessage>Please select a gender.</FormErrorMessage>
                )}
              </FormControl>
              
              <FormControl id="phone" isRequired isInvalid={formData.phone && !/^\d{10}$/.test(formData.phone)}>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaPhoneAlt} />} />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const formattedPhone = e.target.value.replace(/\D/g, ""); // removes non-numeric characters
                      if (formattedPhone.length <= 10) {
                        setFormData({ ...formData, phone: formattedPhone });
                      }
                    }}
                    placeholder="(123) 456-7890"
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </InputGroup>
                {formData.phone && !/^\d{10}$/.test(formData.phone) && (
                  <FormErrorMessage>Phone number must be 10 digits long.</FormErrorMessage>
                )}
              </FormControl>


              <FormControl
                id="email"
                isRequired
                isInvalid={
                  formData.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                }
              >
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
                    placeholder="Enter your email"
                  />
                </InputGroup>
                {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <FormErrorMessage>Invalid email format.</FormErrorMessage>
                )}
              </FormControl>

              <Box mb={6} bg="gray.100" p={4} borderRadius="md">
                <Heading fontSize="lg" color="teal.500" mb={4}>
                  Step 2: Address Section
                </Heading>
                <Divider borderColor="gray.300" />
              </Box>

              {/* Address Section */}
              <FormControl id="street" isRequired isInvalid={formData.address.street && !/^[a-zA-Z0-9\s,.#-]{2,50}$/.test(formData.address.street)}>
                <FormLabel>Street</FormLabel>
                <Input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={(e) => handleNestedChange(e, "address", "street")}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                  placeholder="Enter street address"
                />
                {formData.address.street && !/^[a-zA-Z0-9\s,.#-]{2,50}$/.test(formData.address.street) && (
                  <FormErrorMessage>Invalid street address format.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="city" isRequired isInvalid={formData.address.city && !/^[a-zA-Z\s]+$/.test(formData.address.city)}>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={(e) => handleNestedChange(e, "address", "city")}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                  placeholder="Enter city"
                />
                {formData.address.city && !/^[a-zA-Z\s]+$/.test(formData.address.city) && (
                  <FormErrorMessage>City name should only contain letters.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="state" isRequired>
                <FormLabel>State</FormLabel>
                <Select
                  name="state"
                  value={formData.address.state}
                  onChange={(e) => handleNestedChange(e, "address", "state")}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                  placeholder="Select a state"
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Select>
              </FormControl>


              <FormControl id="zip" isRequired isInvalid={formData.address.zip && !/^\d{5}(-\d{4})?$/.test(formData.address.zip)}>
                <FormLabel>Zip Code</FormLabel>
                <Input
                  type="text"
                  name="zip"
                  value={formData.address.zip}
                  onChange={(e) => handleNestedChange(e, "address", "zip")}
                  focusBorderColor="teal.400"
                  borderRadius="md"
                  placeholder="Enter zip code"
                />
                {formData.address.zip && !/^\d{5}(-\d{4})?$/.test(formData.address.zip) && (
                  <FormErrorMessage>Zip code must be 5 digits.</FormErrorMessage>
                )}
              </FormControl>

              {/* Insurance Details */}
              <Box mb={6} bg="gray.100" p={4} borderRadius="md">
                <Heading fontSize="lg" color="teal.500" mb={4}>
                  Step 3: Insurance Details
                </Heading>
                <Divider borderColor="gray.300" />
              </Box>
              <FormControl id="insuranceProvider" isRequired isInvalid={formData.insuranceProvider && !/^[a-zA-Z\s]+$/.test(formData.insuranceProvider)}>
                <FormLabel>Insurance Provider</FormLabel>
                <Input
                  type="text"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  placeholder="e.g., Aetna, Blue Cross"
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
                {formData.insuranceProvider && !/^[a-zA-Z\s]+$/.test(formData.insuranceProvider) && (
                  <FormErrorMessage>Only letters and spaces are allowed.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="policyNumber" isRequired isInvalid={formData.policyNumber && !/^[a-zA-Z0-9]{6,20}$/.test(formData.policyNumber)}>
                <FormLabel>Policy Number</FormLabel>
                <Input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="6-20 alphanumeric characters"
                  focusBorderColor="teal.400"
                  borderRadius="md"
                />
                {formData.policyNumber && !/^[a-zA-Z0-9]{6,20}$/.test(formData.policyNumber) && (
                  <FormErrorMessage>Policy number must be 6-20 alphanumeric characters.</FormErrorMessage>
                )}
              </FormControl>


              {/* Emergency Contact */}
              <Box mb={6} bg="gray.100" p={4} borderRadius="md">
                <Heading fontSize="lg" color="teal.500" mb={4}>
                  Step 4: Emergency Contact
                </Heading>
                <Divider borderColor="gray.300" />
              </Box>
              <FormControl
                id="emergencyContactName"
                isRequired
                isInvalid={
                  formData.emergencyContact.name &&
                  !/^[a-zA-Z\s]{2,50}$/.test(formData.emergencyContact.name)
                }
              >
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
                  placeholder="Enter contact name"
                />
                {formData.emergencyContact.name &&
                  !/^[a-zA-Z\s]{2,50}$/.test(formData.emergencyContact.name) && (
                    <FormErrorMessage>Name must be 2-50 letters.</FormErrorMessage>
                  )}
              </FormControl>

              <FormControl
                id="relationship"
                isRequired
                isInvalid={!formData.emergencyContact.relationship}
              >
                <FormLabel>Relationship to Patient</FormLabel>
                <Select
                  name="relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) =>
                    handleNestedChange(e, "emergencyContact", "relationship")
                  }
                  focusBorderColor="teal.400"
                  borderRadius="md"
                  placeholder="Select an option"
                >
                  <option value="mother">Mother</option>
                  <option value="father">Father</option>
                  <option value="other">Other</option>
                </Select>
                {!formData.emergencyContact.relationship && (
                  <FormErrorMessage>Please select a relationship.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="emergencyPhone"
                isRequired
                isInvalid={
                  formData.emergencyContact.phone &&
                  !/^\d{10}$/.test(formData.emergencyContact.phone)
                }
              >
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
                  placeholder="Enter phone number"
                />
                {formData.emergencyContact.phone &&
                  !/^\d{10}$/.test(formData.emergencyContact.phone) && (
                    <FormErrorMessage>Phone number must be 10 digits.</FormErrorMessage>
                  )}
              </FormControl>

              <FormControl
                id="emergencyEmail"
                isRequired
                isInvalid={
                  formData.emergencyContact.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emergencyContact.email)
                }
              >
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
                  placeholder="Enter email address"
                />
                {formData.emergencyContact.email &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emergencyContact.email) && (
                    <FormErrorMessage>Invalid email format.</FormErrorMessage>
                  )}
              </FormControl>

              {/* Medical History */}
              <Box mb={6} bg="gray.100" p={4} borderRadius="md">
                <Heading fontSize="lg" color="teal.500" mb={4}>
                  Step 5: Medical History
                </Heading>
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

              {/* Lifestyle Information */}
              <Box mb={6} bg="gray.100" p={4} borderRadius="md">
                <Heading fontSize="lg" color="teal.500" mb={4}>
                  Step 6: Lifestyle Information
                </Heading>
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
            {/* </Grid> */}

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
