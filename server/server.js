import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import fetch from "node-fetch"; // Import fetch from node-fetch
import "isomorphic-fetch";
import { exec } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

// Ensure the 'uploads/' and 'transcripts/' directories exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
if (!fs.existsSync("transcripts")) {
  fs.mkdirSync("transcripts");
}

const app = express();
const googleAPIKey = new GoogleGenerativeAI(
  "AIzaSyAogRxjZDtIsvZgRILsSEcSmQwIvloDRb0",
  { fetch }
);
const genAI = new GoogleGenerativeAI(googleAPIKey, { fetch }); // Initialize with API key and fetch
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Multer setup to store uploaded files temporarily in 'uploads/' directory
const upload = multer({ dest: "uploads/" });

app.post("/transcribe", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const audioFilePath = path.resolve(req.file.path);

  console.log(`Uploaded audio file path: ${audioFilePath}`);

  // Run the Whisper command, outputting to 'transcripts/' directory
  exec(
    `whisper ${audioFilePath} --model medium --output_format vtt --output_dir transcripts/`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running Whisper: ${error.message}`);
        return res.status(500).send("Error transcribing the audio.");
      }

      // Compute the transcription file path
      const transcriptFilePath = path.join(
        "transcripts",
        req.file.filename + ".vtt"
      );

      fs.readFile(transcriptFilePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading transcription file: ${err.message}`);
          return res.status(500).send("Error reading the transcription.");
        }

        // Send the transcription data to the frontend
        res.send(data);

        // Clean up uploaded file and transcription file
        fs.unlink(audioFilePath, () => {});
        fs.unlink(transcriptFilePath, () => {});
      });
    }
  );
});

app.post("/generate-summary", async (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: "Transcript is required." });
  }

  try {
    // Define the prompt
    const prompt = `Based on this transcript of a Patient and a Doctor, determine who is the patient and who is the doctor and rewrite the transcript in the following format with the same order of the conversation:\nPatient:\n--------\n\n${transcript}`;

    // Use the model to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // Extract the text from the response
    const response = await result.response;
    const generatedText = await response.text();

    // Send the generated summary back to the client
    res.json({ summary: generatedText });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Error generating summary." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
