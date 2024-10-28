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

  const [verificationCode, setVerificationCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

      const code = generateCode();
      setVerificationCode(code);

      // Map fields to the patient_codes structure
      const patientCodeData = {
        code,
        doctor_id: doctorId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await addDoc(collection(db, "patient_codes"), patientCodeData);
      console.log("Patient Code Added:", patientCodeData);

      

      setSuccessMessage(
        `Patient added! Verification Code: ${code}. Code has been generated and emailed to patient -- please reach out to patient & ask them to sign up for patient priority access.`
      );
    } catch (error) {
      console.error("Error adding patient data or sending email:", error);
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

        
      </Box>
    </Container>
  );
}

export default AddPatient;
