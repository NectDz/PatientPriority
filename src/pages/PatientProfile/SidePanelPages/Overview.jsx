import React, { useEffect, useState } from "react";
import { 
  ChakraProvider, 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Divider, 
  Spinner,
  useToast
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
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!patient) { //if you are here then you didnt find a patient
        return (
            <Box p={8}>
                <Text>No patient data available. Please make sure you are logged in with the correct account.</Text>
            </Box>
        );
    }

    return (
        <ChakraProvider>
            <Box bg="#F4F4F9" minHeight="100vh" padding="2rem" color="#333" display="flex" justifyContent="center" alignItems="center">
                <VStack
                    spacing={8}
                    align="stretch"
                    width="80%"
                    maxWidth="1200px"
                    boxShadow="lg"
                    bg="white"
                    borderRadius="md"
                    padding="2rem"
                >
                    {/* <Heading as="h1" size="lg" textAlign="center" color="#0B2545">
                        Patient Overview
                    </Heading>
                    <Divider /> idk -- this looks off center to me*/}

                    {/* Patient Info */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Patient Information
                        </Heading>
                        <Text><strong>Name:</strong> {patient.firstName} {patient.lastName}</Text>
                        <Text><strong>Age:</strong> {patient.age}</Text>
                        <Text><strong>Gender:</strong> {patient.gender}</Text>
                        <Text><strong>Phone:</strong> {patient.phone}</Text>
                        <Text><strong>Email:</strong> {patient.email}</Text>
                    </Box>

                    <Divider />

                    {/* Address Info */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Address
                        </Heading>
                        <Text><strong>Street:</strong> {patient.address.street}</Text>
                        <Text><strong>City:</strong> {patient.address.city}</Text>
                        <Text><strong>State:</strong> {patient.address.state}</Text>
                        <Text><strong>ZIP:</strong> {patient.address.zip}</Text>
                    </Box>

                    <Divider />

                    {/* Health Info */}
                    <Box>
                        <Heading as="h2" size="md" color="#0B2545" mb={2}>
                            Health Information
                        </Heading>
                        <Text><strong>Diet:</strong> {patient.diet}</Text>
                        <Text><strong>Physical Activity:</strong> {patient.physicalActivity}</Text>
                        <Text><strong>Lifestyle:</strong> {patient.lifestyle}</Text>
                        <Text><strong>Alcohol Consumption:</strong> {patient.alcoholConsumption}</Text>
                        <Text><strong>Conditions:</strong> {patient.conditions || "None reported"}</Text>
                        <Text><strong>Allergies:</strong> {patient.allergies || "None reported"}</Text>
                        <Text><strong>Medications:</strong> {patient.medications || "None reported"}</Text>
                    </Box>

                    <Divider />

                    
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default Overview;