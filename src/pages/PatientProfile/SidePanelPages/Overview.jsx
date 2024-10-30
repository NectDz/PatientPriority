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

    
    }

    return (
        <ChakraProvider>
            <Box bg="#F4F4F9" minHeight="100vh" padding="2rem" color="#333" display="flex" justifyContent="center" alignItems="center">
                
            </Box>
        </ChakraProvider>
    );
}

export default Overview;