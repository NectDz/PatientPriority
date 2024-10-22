import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [transcription, setTranscription] = useState(""); //state to store transcription text

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setMessage("Please select an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    try {
      setUploading(true);
      setMessage("");
      setTranscription("");

      const response = await fetch("http://localhost:3000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const text = await response.text();
        setTranscription(text); //display transcription text
        setMessage("Transcription successful.");
      } else {
        setMessage("Error during transcription.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        gap={4}
      >
        <Heading>Upload Audio File</Heading>
        <Input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          display="none"
          id="audio-upload"
        />
        <Button as="label" htmlFor="audio-upload" colorScheme="blue">
          Select Audio
        </Button>
        <Button
          onClick={handleUpload}
          colorScheme="green"
          isLoading={uploading}
          mt={4}
        >
          Upload and Transcribe
        </Button>
        {message && <Box mt={4}>{message}</Box>}
        {transcription && (
          <Box
            mt={4}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            w="80%"
            bg="gray.100"
          >
            <Heading size="md" mb={2}>
              Transcription:
            </Heading>
            <Text whiteSpace="pre-wrap">{transcription}</Text>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default Home;
