import React, { useEffect, useState } from "react";
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
  useToast
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    async function fetchPatient() {
      try {
        const patientDoc = await getDoc(doc(db, "patients", id));
        if (patientDoc.exists()) {
          setPatient({ id: patientDoc.id, ...patientDoc.data() });
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
  }, [id, toast]);

  const InfoField = ({ label, value }) => (
    <Box mb={2}>
      <Text fontWeight="semibold" color="gray.600" fontSize="sm" mb={1}>{label}</Text>
      <Text color="gray.800" fontSize="md">{value || "Not provided"}</Text>
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
          
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default PatientDetails;