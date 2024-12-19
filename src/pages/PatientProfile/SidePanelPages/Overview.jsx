import React, { useEffect, useState } from "react";
import { 
  ChakraProvider, 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Divider, 
  Spinner,
  useToast,
  Badge,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaUser, FaAddressBook, FaHeartbeat, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";

const db = getFirestore();
const auth = getAuth();

function Overview() {
    const [patient, setPatient] = useState(null); //stores patient data, initially empty aka null
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) { //if youre here then user is logged in
                try {
                    const patientsRef = collection(db, "patients"); //pateint refrence
                    const q = query(patientsRef, where("email", "==", user.email)); //query is to match the email of the user logged in to the emailt hat's in the database
                    const querySnapshot = await getDocs(q); //get the results of said query
                    
                    if (!querySnapshot.empty) {
                        const patientDoc = querySnapshot.docs[0]; //if we get a result, take the first one out of that results snapshot
                        setPatient({ id: patientDoc.id, ...patientDoc.data() }); //update state w that data, ... means include all fields
                    } else {
                        throw new Error("No patient data found for this email");
                    }
                } catch (error) {
                    console.error("Error fetching patient data:", error);
                    toast({
                        title: "Error",
                        description: error.message || "Failed to load patient data",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            } else {
                toast({
                    title: "Authentication Error",
                    description: "Please log in to view your information",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
            setLoading(false);
        });

        //to prevent memory leaks?
        return () => unsubscribe();
    }, [toast]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh" bg="gray.50">
                <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
            </Box>
        );
    }

    if (!patient) { //if you are here then you didnt find a patient
        return (
            <Box p={8} bg="gray.50" minH="100vh" display="flex" justifyContent="center" alignItems="center">
                <Box bg="white" p={6} rounded="lg" shadow="md">
                    <Text fontSize="lg" color="gray.600">No patient data available. Please make sure you are logged in with the correct account.</Text>
                </Box>
            </Box>
        );
    }

    const InfoField = ({ label, value }) => (
        <Box mb={2}>
            <Text fontWeight="semibold" color="gray.600" fontSize="sm" mb={1}>{label}</Text>
            <Text color="gray.800" fontSize="md">{value || "Not provided"}</Text>
        </Box>
    );

    const SectionBox = ({ title, icon: Icon, bgColor, iconColor, children }) => (
        <Box 
            p={6} 
            bg={bgColor} 
            borderRadius="lg"
            transition="transform 0.2s"
            _hover={{ transform: "translateY(-2px)" }}
        >
            <Heading as="h2" size="md" color={iconColor} mb={4} display="flex" alignItems="center">
                <Icon style={{ marginRight: "8px" }} />
                {title}
            </Heading>
            {children}
        </Box>
    );

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
                    <SectionBox title="Patient Information" icon={FaUser} bgColor="blue.50" iconColor="blue.600">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                            <InfoField label="Name" value={`${patient.firstName} ${patient.lastName}`} />
                            <InfoField label="Age" value={patient.age} />
                            <InfoField label="Gender" value={patient.gender} />
                            <InfoField label="Phone" value={patient.phone} />
                            <GridItem colSpan={{ base: 1, md: 2 }}>
                                <InfoField label="Email" value={patient.email} />
                            </GridItem>
                        </Grid>
                    </SectionBox>

                    {/* Address Info */}
                    <SectionBox title="Address" icon={FaAddressBook} bgColor="purple.50" iconColor="purple.600">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                            <InfoField label="Street" value={patient.address.street} />
                            <InfoField label="City" value={patient.address.city} />
                            <InfoField label="State" value={patient.address.state} />
                            <InfoField label="ZIP" value={patient.address.zip} />
                        </Grid>
                    </SectionBox>

                    {/* Health Info */}
                    <SectionBox title="Health Information" icon={FaHeartbeat} bgColor="green.50" iconColor="green.600">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
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
                                            <Badge 
                                                key={key} 
                                                mr={2} 
                                                mb={2} 
                                                colorScheme="purple" 
                                                variant="subtle" 
                                                fontSize="sm"
                                                p={2}
                                            >
                                                {`${med.name} (${med.dosage}, ${med.frequency})`}
                                            </Badge>
                                        )) : 
                                        "None reported"
                                    }
                                />
                            </GridItem>
                        </Grid>
                    </SectionBox>

                    {/* Emergency Info */}
                    <SectionBox title="Emergency Contact" icon={FaPhoneAlt} bgColor="red.50" iconColor="red.600">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                            <InfoField label="Name" value={patient.emergencyContact.name} />
                            <InfoField label="Relationship" value={patient.emergencyContact.relationship} />
                            <InfoField label="Phone" value={patient.emergencyContact.phone} />
                            <InfoField label="Email" value={patient.emergencyContact.email} />
                        </Grid>
                    </SectionBox>

                    {/* Insurance Info */}
                    <SectionBox title="Insurance Information" icon={FaShieldAlt} bgColor="yellow.50" iconColor="yellow.700">
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                            <InfoField label="Provider" value={patient.insuranceProvider} />
                            <InfoField label="Policy Number" value={patient.policyNumber} />
                        </Grid>
                    </SectionBox>
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default Overview;
