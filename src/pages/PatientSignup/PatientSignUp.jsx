import {
  ChakraProvider,
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function PatientSignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    verificationCode: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const verifyPatientInfo = async () => {
    setLoading(true);
    try {
      // Check the "patient_codes" collection for matching patient info
      const patientQuery = query(
        collection(db, "patient_codes"),
        where("code", "==", patientInfo.verificationCode),
        where("firstName", "==", patientInfo.firstName),
        where("lastName", "==", patientInfo.lastName),
        where("email", "==", patientInfo.email)
      );

      const patientSnapshot = await getDocs(patientQuery);

      if (patientSnapshot.empty) {
        toast({
          title: "Verification Failed",
          description: "The provided information does not match our records.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      // If successful, move to the next step
      toast({
        title: "Verification Successful",
        description: "Information verified. Proceeding to account setup.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setStep(2);
    } catch (error) {
      console.error("Error verifying patient information: ", error);
      toast({
        title: "Error",
        description: "An error occurred while verifying information.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        patientInfo.email,
        patientInfo.password
      );

      const user = userCredential.user;

      // Find the patient in "patients" collection by email and add the UID
      const patientQuery = query(
        collection(db, "patients"),
        where("email", "==", patientInfo.email)
      );

      const patientSnapshot = await getDocs(patientQuery);

      if (!patientSnapshot.empty) {
        const patientDoc = patientSnapshot.docs[0];
        await updateDoc(patientDoc.ref, { id: user.uid });
      } else {
        // If patient doesn't exist in patients collection, add a new entry
        await addDoc(collection(db, "patients"), {
          id: user.uid,
          firstName: patientInfo.firstName,
          lastName: patientInfo.lastName,
          email: patientInfo.email,
          accountCreatedDate: new Date(),
        });
      }

      toast({
        title: "Sign Up Successful",
        description: "Patient account created successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/patient-login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Flex justify="center" align="center" height="100vh" bg="gray.100">
        <Box bg="white" p={6} rounded="md" shadow="md" w={["90%", "400px"]}>
          {step === 1 ? (
            <Grid gap={4}>
              <Heading as="h2" size="lg" textAlign="center">
                Patient Verification
              </Heading>
              <FormControl isRequired>
                <FormLabel>Verification Code</FormLabel>
                <Input
                  name="verificationCode"
                  value={patientInfo.verificationCode}
                  onChange={handleChange}
                  placeholder="Enter Verification Code"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={patientInfo.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={patientInfo.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={patientInfo.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </FormControl>
              <Button
                bg="#5AACA8"
                color="white"
                onClick={verifyPatientInfo}
                isLoading={loading}
              >
                Verify Information
              </Button>
            </Grid>
          ) : (
            <Grid gap={4}>
              <Heading as="h2" size="lg" textAlign="center">
                Set Login Details
              </Heading>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={patientInfo.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={patientInfo.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <Button
                bg="#5AACA8"
                color="white"
                onClick={handleSubmit}
                isLoading={loading}
              >
                Sign Up
              </Button>
            </Grid>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default PatientSignUp;
