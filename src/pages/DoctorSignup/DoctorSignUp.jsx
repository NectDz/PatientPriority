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
import { db, auth } from "../../firebase-config"; // import both auth and db
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"; // firebase Authentication

function DoctorSignUp() {
  const navigate = useNavigate();
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
      //verify the credentials in the 'credentials'
      const credentialsQuery = query(
        collection(db, "credentials"),
        where("credential_id", "==", doctorInfo.credentials),
        where("firstName", "==", doctorInfo.firstName),
        where("lastName", "==", doctorInfo.lastName),
        where("hospital", "==", doctorInfo.hospital)
      );

      const credentialsSnapshot = await getDocs(credentialsQuery);

      if (credentialsSnapshot.empty) {
        toast({
          title: "Verification Failed",
          description: "The provided credentials do not match our records.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      //check if the doctor already exists in the 'doctor'
      const doctorQuery = query(
        collection(db, "doctor"),
        where("credential_id", "==", doctorInfo.credentials),
        where("firstName", "==", doctorInfo.firstName),
        where("lastName", "==", doctorInfo.lastName),
        where("hospitalName", "==", doctorInfo.hospital)
      );

      const doctorSnapshot = await getDocs(doctorQuery);

      if (!doctorSnapshot.empty) {
        toast({
          title: "Doctor Already Exists",
          description:
            "A doctor with the same credentials is already registered.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      //if both checks pass, proceed
      toast({
        title: "Verification Successful",
        description: "Credentials verified. Proceeding to the next step.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setStep(2);
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
      //create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        doctorInfo.email,
        doctorInfo.password
      );

      const user = userCredential.user;

      //add doctor info to Firestore, including email
      await addDoc(collection(db, "doctor"), {
        id: user.uid, //use the user's unique Firebase ID
        firstName: doctorInfo.firstName,
        lastName: doctorInfo.lastName,
        hospitalName: doctorInfo.hospital,
        credential_id: doctorInfo.credentials,
        email: doctorInfo.email, //add the doctor's email here
        accountCreatedDate: new Date(), //set current date as the account creation date
      });

      toast({
        title: "Sign Up Successful",
        description: "Doctor account created successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      console.log("User created:", userCredential.user);
      navigate("/doctor-login");
      
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
      <Flex justify="center" align="center" height="100vh" bg="#f1f8ff">
        <Box bg="white" p={6} rounded="md" shadow="md" w={["90%", "400px"]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
        padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
        transition="all 0.3s"
        _hover={{ boxShadow: "2xl" }}
        >
          {step === 1 ? (
            <Grid gap={4}>
              <Heading as="h2" size="lg" textAlign="center" color="#00366d">
                Doctor Credentials
              </Heading>
              <FormControl isRequired>
                <FormLabel color="#335d8f">First Name</FormLabel>
                <Input
                  name="firstName"
                  value={doctorInfo.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#335d8f">Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={doctorInfo.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#335d8f">Credentials</FormLabel>
                <Input
                  name="credentials"
                  value={doctorInfo.credentials}
                  onChange={handleChange}
                  placeholder="Credential ID"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#335d8f">Hospital Name</FormLabel>
                <Input
                  name="hospital"
                  value={doctorInfo.hospital}
                  onChange={handleChange}
                  placeholder="Hospital Name"
                />
              </FormControl>
              <Button
                _hover={{ bg: "#4d7098" }}
                color="#f1f8ff"
                bg="#335d8f"
                onClick={verifyCredentials}
                isLoading={loading}
              >
                Verify Credentials
              </Button>
            </Grid>
          ) : (
            <Grid gap={4}>
              <Heading as="h2" size="lg" textAlign="center" color="#00366d">
                Set Login Details
              </Heading>
              <FormControl isRequired>
                <FormLabel color="#335d8f">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={doctorInfo.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#335d8f">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={doctorInfo.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <Button
                bg="#335d8f"
                color="white"
                onClick={handleSubmit}
                isLoading={loading} //show loading state while creating
                borderColor="#f1f8ff"
               borderWidth="2px"
               _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
          transition="all 0.3s"
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
