import {
  ChakraProvider,
  Box,
  Flex,
  Grid,
  Text,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase Authentication
import { auth } from "../../firebase-config"; // Import the auth instance from your Firebase configuration

function DoctorSignUp() {
  const [step, setStep] = useState(1);
  const [doctorInfo, setDoctorInfo] = useState({
    firstName: "",
    lastName: "",
    credentials: "",
    hospital: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo((prev) => ({ ...prev, [name]: value }));
  };

  const verifyCredentials = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "credentials"), // Query the 'credentials' collection
        where("credential_id", "==", doctorInfo.credentials),
        where("firstName", "==", doctorInfo.firstName),
        where("lastName", "==", doctorInfo.lastName),
        where("hospital", "==", doctorInfo.hospital)
      );

      const querySnapshot = await getDocs(q); // Execute the query

      if (querySnapshot.empty) {
        toast({
          title: "Verification Failed",
          description: "The provided credentials do not match our records.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Verification Successful",
          description: "Credentials verified. Proceeding to the next step.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setStep(2);
      }
    } catch (error) {
      console.error("Error verifying credentials: ", error);
      toast({
        title: "Error",
        description: "An error occurred while verifying credentials.",
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
      // Firebase Authentication - Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        doctorInfo.email,
        doctorInfo.password
      );

      toast({
        title: "Sign Up Successful",
        description: "Doctor account created successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      console.log("User created:", userCredential.user);
      // You can also add more logic here, like redirecting to another page
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
                Doctor Credentials
              </Heading>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={doctorInfo.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={doctorInfo.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Credentials</FormLabel>
                <Input
                  name="credentials"
                  value={doctorInfo.credentials}
                  onChange={handleChange}
                  placeholder="Credential ID"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hospital Name</FormLabel>
                <Input
                  name="hospital"
                  value={doctorInfo.hospital}
                  onChange={handleChange}
                  placeholder="Hospital Name"
                />
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={verifyCredentials}
                isLoading={loading}
              >
                Verify Credentials
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
                  value={doctorInfo.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={doctorInfo.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <Button
                colorScheme="green"
                onClick={handleSubmit}
                isLoading={loading} // Show loading state while creating the user
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

export default DoctorSignUp;
