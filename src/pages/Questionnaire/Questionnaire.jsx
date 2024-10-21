
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   Input,
//   Select,
//   FormControl,
//   FormLabel,
//   Container,
//   Checkbox,
//   Textarea,
// } from '@chakra-ui/react';

// const App = () => {
//   const [step, setStep] = useState(1); // Step state to toggle between steps
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     phone: '',
//     provider: '', // To hold the selected insurance provider
//     customProvider: '', // To hold the custom provider when "Other" is selected
//     acceptedTOS: false,
//     conditions: '',
//     medications: '',
//     familyHistory: '',
//     lifestyle: '',
//     symptoms: '',
//     allergies: '',
//     surgeries: '',
//   });

//   // Handle input changes for both dropdown and text inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle health insurance provider selection
//   const handleProviderChange = (e) => {
//     const { value } = e.target;
//     // bug fix where I was only ble to choose the other option and type it
//     setFormData((prevData) => ({
//       ...prevData,
//       provider: value,
//       customProvider: value === 'other' ? prevData.customProvider : '',
//     }));
//   };


//   // Proceed to step 2 (after agreeing to TOS)
//   const handleContinue = (e) => {
//     e.preventDefault();
//     if (formData.acceptedTOS) {
//       setStep(2); // Proceed to step 2 if TOS is accepted
//     } else {
//       alert('You must accept the TOS and HIPAA agreement to continue.');
//     }
//   };

//   // Proceed to detailed questions (step 3)
//   const handleNext = (e) => {
//     e.preventDefault();

//     // Ensure an insurance provider is selected or custom provider is entered
//     if (formData.provider === 'other' && !formData.customProvider) {
//       alert('Please enter your custom health insurance provider.');
//     } else if (!formData.provider) {
//       alert('Please select a health insurance provider.');
//     } else {
//       setStep(3); // Move to step 3 if provider is valid
//     }
//   };

//   // Submit final form
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//     // Here, KEVIN u  submit the form data to Gemini AI for generating insights
//   };

//   return (

// <Container maxW="xl" py={10} bg="#F5F5F5" borderRadius="xl" boxShadow="lg" px={6} mt={100}>
// {/* Step 1: Basic Information */}

// {step === 1 && (
//   <Box textAlign="center">
//     <Heading mb={6} fontSize="2xl" color="#2C6975">
//       Patient Health Questionnaire
//     </Heading>
//     <Text mb={4} fontSize="lg" color="#2C6975">
//       Your Information is Important
//     </Text>
//     <Box bg="#FFFFFF" p={6} borderRadius="xl" boxShadow="base">
//       <Text mb={4} color="#2C6975" fontSize="md">
//         The information you provide will be used to generate personalized health insights to improve your care.
//       </Text>
//       <Text mb={4} color="#2C6975" fontSize="md">
//         Please complete this questionnaire to help us better understand your health profile.
//       </Text>
//       <Text mb={2} fontSize="sm" color="#2C6975">
//         Estimated time: 4 minutes
//       </Text>
//       <Checkbox
//         mb={4}
//         isChecked={formData.acceptedTOS}
//         onChange={(e) => setFormData({ ...formData, acceptedTOS: e.target.checked })}
//         colorScheme="teal"
//       >
//         I agree to the Terms of Service and HIPAA Agreement
//       </Checkbox>
//       <Button
//         colorScheme="teal"
//         size="lg"
//         onClick={handleContinue}
//         width="100%"
//         borderRadius="md"
//         bg="#2C6975"
//         color="#FFFFFF"
//         _hover={{ bg: "#68B2A0" }}
//       >
//         Start Questionnaire
//       </Button>
//     </Box>
//     <Text mt={4} fontSize="sm" color="#2C6975">
//       All information provided is confidential and will be used to generate personalized health insights.
//     </Text>
//   </Box>
// )}

// {/* Step 2: Health Insurance Information */}
// {step === 2 && (
//   <Box>
//     <Heading mb={6} textAlign="center" fontSize="2xl" color="#2C6975">
//       Basic Information & Medical History
//     </Heading>
//     <form onSubmit={handleNext}>
//       <VStack spacing={5}>
//         <FormControl id="name" isRequired>
//           <FormLabel>Your Name</FormLabel>
//           <Input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//           />
//         </FormControl>

//         <FormControl id="dob" isRequired>
//           <FormLabel>Date of Birth</FormLabel>
//           <Input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//           />
//         </FormControl>

//         <FormControl id="phone" isRequired>
//           <FormLabel>Your Phone Number</FormLabel>
//           <Input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//           />
//         </FormControl>

//         <FormControl id="provider" isRequired>
//           <FormLabel>Your Health Insurance Provider</FormLabel>
//           <Select
//             name="provider"
//             value={formData.provider}
//             onChange={handleProviderChange}
//             placeholder="Select your healthcare provider"
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//           >
//             <option value="provider1">Health First</option>
//             <option value="provider2">Fidelis</option>
//             <option value="provider3">Emblem Health</option>
//             <option value="other">Other</option>
//           </Select>
//         </FormControl>

//         {/* Display custom provider input if "Other" is selected */}
//         {formData.provider === 'other' && (
//           <FormControl id="customProvider" isRequired>
//             <FormLabel>Enter Your Health Insurance Provider</FormLabel>
//             <Input
//               type="text"
//               name="customProvider"
//               value={formData.customProvider}
//               onChange={handleChange}
//               placeholder="Enter your health insurance provider"
//               bg="#FFFFFF"
//               size="lg"
//               borderRadius="md"
//               borderColor="#68B2A0"
//             />
//           </FormControl>
//         )}

//         <Button
//           type="submit"
//           colorScheme="teal"
//           size="lg"
//           width="100%"
//           borderRadius="md"
//           bg="#2C6975"
//           color="#FFFFFF"
//           _hover={{ bg: "#68B2A0" }}
//         >
//           Next
//         </Button>
//       </VStack>
//     </form>
//   </Box>
// )}

// {/* Step 3: Detailed Health Information */}
// {step === 3 && (
//   <Box>
//     <Heading mb={6} textAlign="center" fontSize="2xl" color="#2C6975">
//       Health Information
//     </Heading>
//     <form onSubmit={handleSubmit}>
//       <VStack spacing={6}>
//         <FormControl id="conditions" isRequired>
//           <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
//             Do you have any known medical conditions?
//           </FormLabel>
//           <Textarea
//             placeholder="List conditions such as diabetes, hypertension, etc."
//             name="conditions"
//             value={formData.conditions}
//             onChange={handleChange}
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//             focusBorderColor="#68B2A0"
//             _hover={{ borderColor: "#68B2A0" }}
//             _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
//             p={4}
//           />
//         </FormControl>

//         <FormControl id="medications" isRequired>
//           <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
//             What medications are you currently taking?
//           </FormLabel>
//           <Textarea
//             placeholder="List any current medications"
//             name="medications"
//             value={formData.medications}
//             onChange={handleChange}
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//             focusBorderColor="#68B2A0"
//             _hover={{ borderColor: "#68B2A0" }}
//             _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
//             p={4}
//           />
//         </FormControl>

//         <FormControl id="surgeries" isRequired>
//           <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
//             Have you had any surgeries or hospitalizations?
//           </FormLabel>
//           <Textarea
//             placeholder="List any past surgeries or hospitalizations"
//             name="surgeries"
//             value={formData.surgeries}
//             onChange={handleChange}
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//             focusBorderColor="#68B2A0"
//             _hover={{ borderColor: "#68B2A0" }}
//             _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
//             p={4}
//           />
//         </FormControl>

//         <FormControl id="familyHistory" isRequired>
//           <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
//             Do you have any family medical history (e.g., heart disease, diabetes)?
//           </FormLabel>
//           <Textarea
//             placeholder="Provide details on any family history of diseases"
//             name="familyHistory"
//             value={formData.familyHistory}
//             onChange={handleChange}
//             bg="#FFFFFF"
//             size="lg"
//             borderRadius="md"
//             borderColor="#68B2A0"
//             focusBorderColor="#68B2A0"
//             _hover={{ borderColor: "#68B2A0" }}
//             _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
//             p={4}
//           />
//         </FormControl>

//         <Button
//           type="submit"
//           colorScheme="teal"
//           size="lg"
//           width="100%"
//           borderRadius="md"
//           bg="#2C6975"
//           color="#FFFFFF"
//           _hover={{ bg: "#68B2A0" }}
//           p={6}
//           fontWeight="bold"
//         >
//           Submit
//         </Button>
//       </VStack>
//     </form>
//   </Box>
// )}
// </Container>
// );
// };

// export default App;
import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Container,
  Checkbox,
  Textarea,
} from '@chakra-ui/react';

const App = () => {
  const [step, setStep] = useState(1); // Step state to toggle between steps
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    phone: '',
    email: '',
    insuranceProvider: '',
    policyNumber: '',
    primaryCarePhysician: {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      phone: '',
    },
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
    acceptedTOS: false,
    conditions: '',
    medications: '',
    familyHistory: '',
    surgeries: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleAddressChange = (e, section, field) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        address: {
          ...prevData[section].address,
          [field]: value,
        },
      },
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Container maxW="xl" py={10} bg="#F5F5F5" borderRadius="xl" boxShadow="lg" px={6} mt={10}>
      {/* Step 1: Personal Information */}
      {step === 1 && (
        <Box>
          <Heading mb={6} textAlign="center" fontSize="2xl" color="#2C6975">
            Step 1: Personal Information
          </Heading>
          <form onSubmit={handleContinue}>
            <VStack spacing={5}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="dob" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <Input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Enter your gender"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                borderRadius="md"
                bg="#2C6975"
                color="#FFFFFF"
                _hover={{ bg: "#68B2A0" }}
              >
                Next
              </Button>
            </VStack>
          </form>
        </Box>
      )}

      {/* Step 2: Insurance Details */}
      {step === 2 && (
        <Box>
          <Heading mb={6} textAlign="center" fontSize="2xl" color="#2C6975">
            Step 2: Insurance Details
          </Heading>
          <form onSubmit={handleContinue}>
            <VStack spacing={5}>
              <FormControl id="insuranceProvider" isRequired>
                <FormLabel>Insurance Provider</FormLabel>
                <Input
                  type="text"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  placeholder="Enter your insurance provider"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="policyNumber" isRequired>
                <FormLabel>Policy Number</FormLabel>
                <Input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="Enter your policy number"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="primaryCarePhysicianName" isRequired>
                <FormLabel>Primary Care Physician's Name</FormLabel>
                <Input
                  type="text"
                  name="primaryCarePhysicianName"
                  value={formData.primaryCarePhysician.name}
                  onChange={(e) => handleNestedChange(e, 'primaryCarePhysician', 'name')}
                  placeholder="Enter your primary care physician's name"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              {/* Primary Care Physician's Address */}
              <FormControl id="primaryCarePhysicianStreet" isRequired>
                <FormLabel>Primary Care Physician's Street</FormLabel>
                <Input
                  type="text"
                  name="primaryCarePhysicianStreet"
                  value={formData.primaryCarePhysician.address.street}
                  onChange={(e) => handleAddressChange(e, 'primaryCarePhysician', 'street')}
                  placeholder="Enter street address"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="primaryCarePhysicianCity" isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  name="primaryCarePhysicianCity"
                  value={formData.primaryCarePhysician.address.city}
                  onChange={(e) => handleAddressChange(e, 'primaryCarePhysician', 'city')}
                  placeholder="Enter city"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="primaryCarePhysicianState" isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  name="primaryCarePhysicianState"
                  value={formData.primaryCarePhysician.address.state}
                  onChange={(e) => handleAddressChange(e, 'primaryCarePhysician', 'state')}
                  placeholder="Enter state"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="primaryCarePhysicianZip" isRequired>
                <FormLabel>Zip Code</FormLabel>
                <Input
                  type="text"
                  name="primaryCarePhysicianZip"
                  value={formData.primaryCarePhysician.address.zip}
                  onChange={(e) => handleAddressChange(e, 'primaryCarePhysician', 'zip')}
                  placeholder="Enter zip code"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="primaryCarePhysicianPhone" isRequired>
                <FormLabel>Primary Care Physician's Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="primaryCarePhysicianPhone"
                  value={formData.primaryCarePhysician.phone}
                  onChange={(e) => handleNestedChange(e, 'primaryCarePhysician', 'phone')}
                  placeholder="Enter physician's phone number"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                borderRadius="md"
                bg="#2C6975"
                color="#FFFFFF"
                _hover={{ bg: "#68B2A0" }}
              >
                Next
              </Button>
            </VStack>
          </form>
        </Box>
      )}


      {/* Step 3: Emergency Contact */}
      {step === 3 && (
        <Box>
          <Heading mb={6} textAlign="center" fontSize="2xl" color="#2C6975">
            Step 3: Emergency Contact
          </Heading>
          <form onSubmit={handleContinue}>
            <VStack spacing={5}>
              <FormControl id="emergencyContactName" isRequired>
                <FormLabel>Emergency Contact Name</FormLabel>
                <Input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'name')}
                  placeholder="Enter emergency contact's name"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="relationship" isRequired>
                <FormLabel>Relationship</FormLabel>
                <Input
                  type="text"
                  name="relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'relationship')}
                  placeholder="Enter relationship"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <FormControl id="emergencyContactPhone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleNestedChange(e, 'emergencyContact', 'phone')}
                  placeholder="Enter emergency contact's phone number"
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                borderRadius="md"
                bg="#2C6975"
                color="#FFFFFF"
                _hover={{ bg: "#68B2A0" }}
              >
                Next
              </Button>
            </VStack>
          </form>
        </Box>
      )}

      {/* Step 4: Terms of Service */}
      {step === 4 && (
        <Box textAlign="center">
          <Heading mb={6} fontSize="2xl" color="#2C6975">
            Step 4: Terms of Service
          </Heading>
          <Box bg="#FFFFFF" p={6} borderRadius="xl" boxShadow="base">
            <Text mb={4} color="#2C6975" fontSize="md">
              Please accept the Terms of Service and HIPAA Agreement to proceed.
            </Text>
            <Checkbox
              mb={4}
              isChecked={formData.acceptedTOS}
              onChange={(e) => setFormData({ ...formData, acceptedTOS: e.target.checked })}
              colorScheme="teal"
            >
              I agree to the Terms of Service and HIPAA Agreement
            </Checkbox>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleContinue}
              width="100%"
              borderRadius="md"
              bg="#2C6975"
              color="#FFFFFF"
              _hover={{ bg: "#68B2A0" }}
              disabled={!formData.acceptedTOS}
            >
              Accept & Continue
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 5: Health Information */}
      {step === 5 && (
        <Box>
          <Heading mb={6} textAlign="center" fontSize="2xl" color="#2C6975">
            Health Information
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl id="conditions" isRequired>
                <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
                  Do you have any known medical conditions?
                </FormLabel>
                <Textarea
                  placeholder="List conditions such as diabetes, hypertension, etc."
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleChange}
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                  focusBorderColor="#68B2A0"
                  _hover={{ borderColor: "#68B2A0" }}
                  _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
                  p={4}
                />
              </FormControl>

              <FormControl id="medications" isRequired>
                <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
                  What medications are you currently taking?
                </FormLabel>
                <Textarea
                  placeholder="List any current medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                  focusBorderColor="#68B2A0"
                  _hover={{ borderColor: "#68B2A0" }}
                  _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
                  p={4}
                />
              </FormControl>

              <FormControl id="surgeries" isRequired>
                <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
                  Have you had any surgeries or hospitalizations?
                </FormLabel>
                <Textarea
                  placeholder="List any past surgeries or hospitalizations"
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleChange}
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                  focusBorderColor="#68B2A0"
                  _hover={{ borderColor: "#68B2A0" }}
                  _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
                  p={4}
                />
              </FormControl>

              <FormControl id="familyHistory" isRequired>
                <FormLabel fontSize="lg" fontWeight="medium" color="#2C6975">
                  Do you have any family medical history (e.g., heart disease, diabetes)?
                </FormLabel>
                <Textarea
                  placeholder="Provide details on any family history of diseases"
                  name="familyHistory"
                  value={formData.familyHistory}
                  onChange={handleChange}
                  bg="#FFFFFF"
                  size="lg"
                  borderRadius="md"
                  borderColor="#68B2A0"
                  focusBorderColor="#68B2A0"
                  _hover={{ borderColor: "#68B2A0" }}
                  _focus={{ borderColor: "#68B2A0", boxShadow: "0 0 0 1px #68B2A0" }}
                  p={4}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                borderRadius="md"
                bg="#2C6975"
                color="#FFFFFF"
                _hover={{ bg: "#68B2A0" }}
                p={6}
                fontWeight="bold"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default App;
