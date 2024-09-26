import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Text } from "@chakra-ui/react";

const Login = () => {
  let navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center" height="100vh">
      <Text fontSize="xl" mb={4}>
        Sign In With Google to Continue
      </Text>
      <Button
        onClick={handleSignInWithGoogle}
        bg="#4285F4"
        _hover={{ bg: "#357ae8" }}
        color="white"
      >
        Sign In With Google
      </Button>
    </Flex>
  );
};

export default Login;
