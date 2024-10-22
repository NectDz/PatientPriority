import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const db = getFirestore();

function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 3; //max number of patients per page but we can change

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchPatients() {
      try {
        if (!user) {
          return;
        }

        const doctorEmail = user.email;

        //get the doctor's ID by matching the email in the "doctor" collection
        const doctorQuery = query(
          collection(db, "doctor"),
          where("email", "==", doctorEmail)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorData = doctorSnapshot.docs[0].data();
          const doctorId = doctorData.id;

          //get patients associated with this doctor
          const patientQuery = query(
            collection(db, "patients"),
            where("doctor_id", "==", doctorId)
          );
          const patientSnapshot = await getDocs(patientQuery);

          //map patient data
          const fetchedPatients = patientSnapshot.docs.map((doc) => ({
            id: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            doctorId: doc.data().doctor_id, //verify doctor-patient relationship
          }));

          setPatients(fetchedPatients);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
      }
    }

    fetchPatients();
  }, [user]);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
    <Box p={8}>
      <Heading as="h1" size="xl" mb={6}>
        Patients
      </Heading>
      {currentPatients.length > 0 ? (
        <VStack spacing={6} align="stretch">
          {currentPatients.map((patient) => (
            <Box
              key={patient.id}
              p={6}
              bg="white"
              borderRadius="md"
              boxShadow="md"
            >
              <Heading as="h2" size="md" mb={2}>
                {patient.firstName} {patient.lastName}
              </Heading>
              <Text>ID: {patient.id}</Text>
              <Button
                as={Link}
                to={`/doctor-profile/patients/${patient.id}`}
                colorScheme="teal"
                mt={4}
              >
                View Details
              </Button>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No patients found.</Text>
      )}

      {patients.length > patientsPerPage && (
        <HStack mt={6} justify="center">
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </HStack>
      )}

        <Box display="flex" justifyContent="center" mt={8} mb={6}>
            <Link to="/doctor-profile/patients/add-new-patient">
                <Button colorScheme="teal" display="flex" alignItems="center" gap="4">
                    Add New Patient
                </Button>
            </Link>
        </Box>

    </Box>
  );
}

export default Patients;