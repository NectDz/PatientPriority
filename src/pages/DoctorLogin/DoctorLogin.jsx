import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Flex,
  Grid,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useAuth } from "../../Context/AuthContext";

const DoctorLogin = () => {
  const { login } = useAuth();
  let navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password); //login function from Auth context
      toast({
        title: "Login Successful",
        description: "You have successfully logged in!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/doctor-profile/home"); //redirect to doctor profile after login
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Login Failed",
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
          <Grid gap={4}>
            <Heading as="h2" size="lg" textAlign="center">
              Doctor Login
            </Heading>

            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              bg="#5AACA8"
              color={"white"}
              onClick={handleLogin}
              isLoading={loading} //loading spinner while logging in
            >
              Log In
            </Button>
          </Grid>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default DoctorLogin;
