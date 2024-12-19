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
                    {/* <Box mb={6}>
                        <Heading 
                            as="h1" 
                            size="xl" 
                            bgGradient="linear(to-r, blue.600, blue.400)" 
                            bgClip="text"
                            textAlign="center"
                        >
                            Patient Overview
                        </Heading>
                    </Box> */}

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
                            <InfoField label="Street" value={patient.address.street} />
                            <InfoField label="City" value={patient.address.city} />
                            <InfoField label="State" value={patient.address.state} />
                            <InfoField label="ZIP" value={patient.address.zip} />
                        </Grid>
                    </Box>

                    {/* Health Info */}
                    <Box 
                        p={6} 
                        bg="green.50" 
                        borderRadius="lg"
                        transition="transform 0.2s"
                        _hover={{ transform: "translateY(-2px)" }}
                    >
                        <Heading as="h2" size="md" color="green.600" mb={4}>
                            Health Information
                        </Heading>
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
                    </Box>

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
                            <InfoField label="Name" value={patient.emergencyContact.name} />
                            <InfoField label="Relationship" value={patient.emergencyContact.relationship} />
                            <InfoField label="Phone" value={patient.emergencyContact.phone} />
                            <InfoField label="Email" value={patient.emergencyContact.email} />
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

export default Overview;