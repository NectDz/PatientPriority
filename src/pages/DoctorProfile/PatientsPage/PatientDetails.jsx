import React, { useEffect, useState, useRef } from "react"; // added useRef
import {
  Box,
  ChakraProvider,
  Heading,
  Text,
  Spinner,
  VStack,
  Grid,
  GridItem,
  Badge,
  useToast,
  Button,
  Input,
  Select,
  Textarea,
  IconButton,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const db = getFirestore();

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); //new for health editing
  const toast = useToast();

  //refs for all form fields -- i tried useCallback, memoization, direct state management, controlled inputs and direct handling but the bug persisted
  //the bug -- clicked to edit, typed 1 letter, had to click back on field to type again, typed 1 letter, had to click back on field to type again on and on 
  const formRefs = {
    diet: useRef(),
    physicalActivity: useRef(),
    lifestyle: useRef(),
    alcoholConsumption: useRef(),
    conditions: useRef(),
    allergies: useRef(),
    medications: {},
  };
  
  const [medicationCount, setMedicationCount] = useState(1);

  const addMedication = () => {
    setMedicationCount(prev => prev + 1);
  };

  useEffect(() => {
    async function fetchPatient() {
      try {
        const patientDoc = await getDoc(doc(db, "patients", id)); //get patient
        if (patientDoc.exists()) {
          const patientData = { id: patientDoc.id, ...patientDoc.data() }; //match id from URL
          setPatient(patientData); //get data and store it in the patient state
          
          //set initial values when entering edit mode
          if (isEditing) {
            Object.keys(formRefs).forEach(key => {
              if (formRefs[key].current) {
                formRefs[key].current.value = patientData[key] || '';
              }
            });
          }
        } else {
          throw new Error("No such patient!");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load patient data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPatient();
  }, [id, toast, isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
    //set initial values when entering edit mode
    Object.keys(formRefs).forEach(key => {
      if (formRefs[key].current) {
        formRefs[key].current.value = patient[key] || '';
      }
    });
  };

  const handleSave = async () => {
    try {
      //collect all medication entries
      const medicationsData = {};
      for (let i = 1; i <= medicationCount; i++) {
        if (formRefs.medications[`name${i}`]?.current?.value) {
          medicationsData[`med${i}`] = {
            name: formRefs.medications[`name${i}`].current?.value || '',
            dosage: formRefs.medications[`dosage${i}`].current?.value || '',
            frequency: formRefs.medications[`frequency${i}`].current?.value || ''
          };
        }
      }

      //collect values from refs
      const formData = {
        ...Object.keys(formRefs).reduce((acc, key) => {
          if (key !== 'medications') {
            acc[key] = formRefs[key].current?.value || '';
          }
          return acc;
        }, {}),
        medications: medicationsData
      };

      await updateDoc(doc(db, "patients", id), formData); //update in doc db with the id in patients collection
      
      setPatient(prev => ({ //update local patient state
        ...prev,
        ...formData
      }));
      
      setIsEditing(false); //exit when success
      
      toast({
        title: "Success",
        description: "Health information updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating patient:", error);
      toast({
        title: "Error",
        description: "Failed to update health information",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const InfoField = ({ label, value }) => (
    <Box mb={2}>
      <Text fontWeight="semibold" color="gray.600" fontSize="sm" mb={1}>{label}</Text>
      <Text color="gray.800" fontSize="md">{value || "Not provided"}</Text>
    </Box>
  );

  const EditableHealthInfo = () => (
    <Box 
      p={6} 
      bg="green.50" 
      borderRadius="lg"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="md" color="green.600">
          Health Information
        </Heading>
        {isEditing ? ( //if false then static if not then dynamic
          <Box>
            <IconButton
              icon={<CheckIcon />}
              colorScheme="green"
              size="sm"
              mr={2}
              onClick={handleSave} //updates real time in firebase
              aria-label="Save"
            />
            <IconButton
              icon={<CloseIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => setIsEditing(false)}
              aria-label="Cancel"
            />
          </Box>
        ) : (
          <IconButton
            icon={<EditIcon />}
            colorScheme="green"
            size="sm"
            onClick={handleStartEditing}
            aria-label="Edit"
          />
        )}
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        {isEditing ? (
          <>
            <GridItem>
              <FormControl>
                <FormLabel>Diet</FormLabel>
                <Input
                  ref={formRefs.diet}
                  name="diet"
                  defaultValue={patient.diet}
                  bg="white"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Physical Activity</FormLabel>
                <Select
                  ref={formRefs.physicalActivity}
                  name="physicalActivity"
                  defaultValue={patient.physicalActivity} //dropdown selections match questionnaire
                  bg="white"
                >
                  <option value="">Select option</option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Active">Active</option>
                  <option value="Very Active">Very Active</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Lifestyle</FormLabel>
                <Input
                  ref={formRefs.lifestyle}
                  name="lifestyle"
                  defaultValue={patient.lifestyle}
                  bg="white"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Alcohol Consumption</FormLabel>
                <Select
                  ref={formRefs.alcoholConsumption}
                  name="alcoholConsumption"
                  defaultValue={patient.alcoholConsumption}
                  bg="white"
                >
                  <option value="">Select option</option>
                  <option value="None">None</option>
                  <option value="Occasional">Occasional</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Regular">Regular</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel>Conditions (comma-separated)</FormLabel>
                <Textarea
                  ref={formRefs.conditions}
                  name="conditions"
                  defaultValue={patient.conditions}
                  bg="white"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel>Allergies (comma-separated)</FormLabel>
                <Textarea
                  ref={formRefs.allergies}
                  name="allergies"
                  defaultValue={patient.allergies}
                  bg="white"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
            <FormControl>
              <FormLabel>Medications</FormLabel>
              {[...Array(medicationCount)].map((_, index) => {
                const medNum = index + 1;
                // Create refs for this medication set if they don't exist
                if (!formRefs.medications[`name${medNum}`]) {
                  formRefs.medications[`name${medNum}`] = useRef();
                  formRefs.medications[`dosage${medNum}`] = useRef();
                  formRefs.medications[`frequency${medNum}`] = useRef();
                }
                
                return (
                  <Grid key={medNum} templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
                    <Input
                      ref={formRefs.medications[`name${medNum}`]}
                      name={`medications.name${medNum}`}
                      defaultValue={patient.medications?.[`med${medNum}`]?.name}
                      placeholder="Medication Name"
                      bg="white"
                    />
                    <Input
                      ref={formRefs.medications[`dosage${medNum}`]}
                      name={`medications.dosage${medNum}`}
                      defaultValue={patient.medications?.[`med${medNum}`]?.dosage}
                      placeholder="Dosage"
                      bg="white"
                    />
                    <Input
                      ref={formRefs.medications[`frequency${medNum}`]}
                      name={`medications.frequency${medNum}`}
                      defaultValue={patient.medications?.[`med${medNum}`]?.frequency}
                      placeholder="Frequency"
                      bg="white"
                    />
                  </Grid>
                );
              })}
              <Button
                size="sm"
                colorScheme="green"
                onClick={addMedication}
                mt={2}
              >
                Add Another Medication
              </Button>
            </FormControl>
          </GridItem>
          </>
        ) : (
          <>
            <InfoField label="Diet" value={patient.diet} />
            <InfoField label="Physical Activity" value={patient.physicalActivity} />
            <InfoField label="Lifestyle" value={patient.lifestyle} />
            <InfoField label="Alcohol Consumption" value={patient.alcoholConsumption} />
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <InfoField 
                label="Conditions" 
                value={
                  patient.conditions ? 
                  patient.conditions.split(',').map((condition, index) => (
                    <Badge key={index} mr={2} mb={2} colorScheme="red" variant="subtle" fontSize="sm">
                      {condition.trim()}
                    </Badge>
                  )) : 
                  "None reported"
                }
              />
              <InfoField 
                label="Allergies" 
                value={
                  patient.allergies ? 
                  patient.allergies.split(',').map((allergy, index) => (
                    <Badge key={index} mr={2} mb={2} colorScheme="orange" variant="subtle" fontSize="sm">
                      {allergy.trim()}
                    </Badge>
                  )) : 
                  "None reported"
                }
              />
              <InfoField 
                label="Medications" 
                value={
                  patient.medications ? 
                  Object.entries(patient.medications).map(([key, med]) => (
                    <Badge key={key} colorScheme="purple" variant="subtle" fontSize="sm" p={2} mr={2} mb={2}>
                      {`${med.name} (${med.dosage}, ${med.frequency})`}
                    </Badge>
                  ))
                  : 
                  "None reported"
                }
              />
            </GridItem>
          </>
        )}
      </Grid>
    </Box>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.50">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box p={8} bg="gray.50" minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Box bg="white" p={6} rounded="lg" shadow="md">
          <Text fontSize="lg" color="gray.600">Patient not found. Please check the patient ID.</Text>
        </Box>
      </Box>
    );
  }

  return (
    <ChakraProvider>
      <Box 
        bgGradient="linear(to-br, blue.50, gray.50)" 
        minHeight="100vh" 
        padding={{ base: "1rem", md: "2rem", lg: "3rem" }} 
        color="#333"
      >
        <VStack
          spacing={8}
          align="stretch"
          width={{ base: "95%", md: "90%", lg: "80%" }}
          maxWidth="1200px"
          mx="auto"
          bg="rgba(255, 255, 255, 0.6)"
          borderRadius="xl"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
        >
          {/* Patient Info */}
          <Box 
            p={6} 
            bg="blue.50" 
            borderRadius="lg"
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-2px)" }}
          >
            <Heading as="h2" size="md" color="blue.600" mb={4}>
              Patient Information
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <InfoField label="Name" value={`${patient.firstName} ${patient.lastName}`} />
              <InfoField label="Age" value={patient.age} />
              <InfoField label="Gender" value={patient.gender} />
              <InfoField label="Phone" value={patient.phone} />
              <GridItem colSpan={{ base: 1, md: 2 }}>
                <InfoField label="Email" value={patient.email} />
              </GridItem>
            </Grid>
          </Box>

          {/* Address Info */}
          <Box 
            p={6} 
            bg="purple.50" 
            borderRadius="lg"
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-2px)" }}
          >
            <Heading as="h2" size="md" color="purple.600" mb={4}>
              Address
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <InfoField label="Street" value={patient.address?.street} />
              <InfoField label="City" value={patient.address?.city} />
              <InfoField label="State" value={patient.address?.state} />
              <InfoField label="ZIP" value={patient.address?.zip} />
            </Grid>
          </Box>

          {/* below is the new health box which doctors can now edit -- code above */}
          <EditableHealthInfo />
          
          {/* Emergency Info */}
          <Box 
            p={6} 
            bg="red.50" 
            borderRadius="lg"
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-2px)" }}
          >
            <Heading as="h2" size="md" color="red.600" mb={4}>
              Emergency Contact
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <InfoField label="Name" value={patient.emergencyContact?.name} />
              <InfoField label="Relationship" value={patient.emergencyContact?.relationship} />
              <InfoField label="Phone" value={patient.emergencyContact?.phone} />
              <InfoField label="Email" value={patient.emergencyContact?.email} />
            </Grid>
          </Box>

          {/* Insurance Info */}
          <Box 
            p={6} 
            bg="yellow.50" 
            borderRadius="lg"
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-2px)" }}
          >
            <Heading as="h2" size="md" color="yellow.700" mb={4}>
              Insurance Information
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <InfoField label="Provider" value={patient.insuranceProvider} />
              <InfoField label="Policy Number" value={patient.policyNumber} />
            </Grid>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default PatientDetails;
