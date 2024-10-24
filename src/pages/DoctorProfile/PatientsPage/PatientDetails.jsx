import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Spinner, Divider, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

function PatientDetails() {
  const { id } = useParams(); // use react router hook to get patient ID from URL, store into variable id
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatient() {
      try {
        //based on the id, search through db under class "patients" and find data that belongs to a certain ID
        const patientDoc = await getDoc(doc(db, "patients", id));
        if (patientDoc.exists()) {
          setPatient({ id: patientDoc.id, ...patientDoc.data() }); // use the spread operator to unpack ALL the properties attached to that patient
          // makes it easier for when theres multiple fields in the patients data (not sure how this would work if a field is an array)
        } else {
          console.log("No such patient!");
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPatient();
  }, [id]);

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

  if (!patient) {
    return <Text>No patient found.</Text>;
  }

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Patient Details
      </Heading>

      <VStack bg="white" p={10} borderRadius="20px" spacing={2} align="start">
        <Heading size="md" mb={4}>
          Personal Details
        </Heading>
        <Text>First Name: {patient.firstName}</Text>
        <Text>Last Name: {patient.lastName}</Text>

        <Divider />

        <Heading size="md" mb={4}>
          Health Information
        </Heading>
        <Text>...</Text>
        <Divider />

        <Heading size="md" mb={4}>
          Insurance Plan
        </Heading>
        <Text>...</Text>

      </VStack>
    </Box>
  );
}

export default PatientDetails;
