import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Text } from "@chakra-ui/react";

const DoctorLogin = () => {
  let navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/audio-test"); //goes to upload audio after successful sign on!!
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center" height="100vh">
      <Text fontSize="5xl" mb={4}>
        Please Sign In with Google to continue
      </Text>
      <Button
        bg="#5AACA8" color="white" size="lg" width="200px" height="50px"
        onClick={handleSignInWithGoogle}
        _hover={{ bg: "#737373" }}
      >
        Sign In with Google
      </Button>
    </Flex>
  );
};

export default DoctorLogin;
