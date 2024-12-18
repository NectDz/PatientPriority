// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ChakraProvider,
//   Box,
//   Flex,
//   Grid,
//   Heading,
//   Button,
//   Input,
//   FormControl,
//   FormLabel,
//   useToast,
// } from "@chakra-ui/react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase-config";
// import { useAuth } from "../../Context/AuthContext";

// const DoctorLogin = () => {
//   const { login } = useAuth();
//   let navigate = useNavigate();
//   const toast = useToast();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       await login(email, password); //login function from Auth context
//       toast({
//         title: "Login Successful",
//         description: "You have successfully logged in!",
//         status: "success",
//         duration: 4000,
//         isClosable: true,
//       });
//       navigate("/doctor-profile/home"); //redirect to doctor profile after login
//     } catch (error) {
//       console.error("Error logging in:", error);
//       toast({
//         title: "Login Failed",
//         description: error.message,
//         status: "error",
//         duration: 4000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ChakraProvider>
//       <Flex justify="center" align="center" height="100vh" bg="gray.100">
//         <Box bg="white" p={6} rounded="md" shadow="md" w={["90%", "400px"]}>
//           <Grid gap={4}>
//             <Heading as="h2" size="lg" textAlign="center">
//               Doctor Login
//             </Heading>

//             <FormControl id="email" isRequired>
//               <FormLabel color="#335d8f">Email Address</FormLabel>
//               <Input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </FormControl>

//             <FormControl id="password" isRequired>
//               <FormLabel color="#335d8f">Password</FormLabel>
//               <Input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </FormControl>

//             <Button
//               bg="#5AACA8"
//               color={"white"}
//               onClick={handleLogin}
//               isLoading={loading} //loading spinner while logging in
//             >
//               Log In
//             </Button>
//           </Grid>
//         </Box>
//       </Flex>
//     </ChakraProvider>
//   );
// };

// export default DoctorLogin;

import { useEffect, useState } from "react";
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
import { auth, db } from "../../firebase-config";
import { useAuth } from "../../Context/AuthContext";
import Footer from "../Home/Footer";
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const DoctorLogin = () => {
  const { login, userRole, logout } = useAuth(); // get userRole from authContext
  let navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password); //login function from Auth context
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

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email to reset your password.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      // Query the "patients" collection to verify the email exists
      const patientsRef = collection(db, "doctor");
      const q = query(patientsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({
          title: "Access Denied",
          description: "This email does not belong to a registered doctor.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      // If email exists in the database, proceed to send reset email
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: `An email has been sent to ${email} with instructions to reset your password.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during password reset:", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // first check if the userRole exists and then verify that it's a doctor
    if (userRole) {
      if (userRole.type === "doctor") {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/doctor-profile/home"); //redirect to doctor profile after login
      } else {
        // if the user is not a doctor, log out and show error message
        toast({
          title: "Access Denied",
          description: "Sorry, only doctors can log in here.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        logout();
      }
    }
  }, [userRole, navigate, toast, logout]);

  return (
    <ChakraProvider>
      <Flex justify="center" align="center" height="100vh" bg="#f1f8ff">
        <Box
          bg="rgba(255, 255, 255, 0.6)"
          p={6}
          rounded="md"
          shadow="xl"
          w={["90%", "400px"]}
          border="1px solid rgba(0, 0, 0, 0.1)"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          padding={{ base: "1.5rem", md: "2rem", lg: "3rem" }}
          transition="all 0.3s"
          _hover={{ boxShadow: "2xl" }}
        >
          <Grid gap={4}>
            <Heading as="h2" size="lg" textAlign="center" color="#00366d">
              Doctor Login
            </Heading>

            <FormControl id="email" isRequired>
              <FormLabel color="#335d8f">Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel color="#335d8f">Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              variant="link"
              color="#335d8f"
              onClick={handlePasswordReset}
            >
              Forgot Password?
            </Button>

            <Button
              //_hover={{ bg: "#4d7098" }}
              color="#f1f8ff"
              bg="#335d8f"
              onClick={handleLogin}
              borderColor="#f1f8ff"
              borderWidth="2px"
              _hover={{ bg: "#4d7098", boxShadow: "2xl" }}
              transition="all 0.3s"
              isLoading={loading} //loading spinner while logging in
            >
              Log In
            </Button>
            <Button
              //_hover={{ bg: "#4d7098" }}
              color="#335d8f"
              bg="#e6eef7"
              onClick={() => navigate("/home")}
              _hover={{ bg: "#e6eef7", color: "#335d8f", boxShadow: "2xl" }}
              borderColor="#f1f8ff"
              borderWidth="2px"
              transition="all 0.3s"
              //isLoading={loading} //loading spinner while logging in
            >
              Back to Home
            </Button>
          </Grid>
        </Box>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
};

export default DoctorLogin;
