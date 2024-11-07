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
  const { transcriptFilePath } = req.body;

  if (!transcriptFilePath) {
    return res.status(400).json({ error: "Transcript file path is required." });
  }

  try {
    // Step 1: Read the transcript file
    const transcript = await fs.promises.readFile(transcriptFilePath, "utf-8");

    // Step 2: Define prompts for each stage (reformatting, extracting JSON, summarizing)
    const prompts = [
      {
        label: "reformattedTranscript",
        prompt: `Based on this transcript of a Patient and a Doctor, determine who is the patient and who is the doctor and rewrite the transcript in the following format with the same order of the conversation:\nPatient:\n--------\n\n${transcript}`,
      },
      {
        label: "extractedData",
        prompt: `Based on this transcript of a Patient and a Doctor, extract the following items and output them in JSON format. Do not include any additional text or explanations—only output the JSON object:\n\n{\n  "VisitReason": "",\n  "Prescription": "",\n  "Dosage": "",\n  "Advice": "",\n  "Next Appointment Date": "",\n  "Next Appointment Time": "",\n  "Diagnosis": "",\n  "Referral(s)": ""\n}\n--------\n\n${transcript}`,
      },
      {
        label: "summaryText",
        prompt: `Based on this transcript of a Patient and a Doctor, summarize the following topics of the conversation for it to be readable in a paragraph of what happened during the visit:\nVisitReason, Prescription, Dosage, Advice, Next Appointment Date, Next Appointment Time, Diagnosis, Referral(s)\n--------\n\n${transcript}`,
      },
    ];

    // Step 3: Execute each prompt and collect results
    const results = {};
    for (const { label, prompt } of prompts) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText?key=${googleAPIKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }), // Ensure prompt is formatted correctly
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(
          `Error from Google API on prompt "${label}":`,
          response.status,
          errorDetails
        );
        return res
          .status(500)
          .json({ error: `Failed to fetch ${label} from Google API` });
      }

      const data = await response.json();
      results[label] = data.candidates[0]?.output || `No ${label} available.`;
    }

    // Parse the extracted data JSON if possible
    let extractedData = null;
    try {
      extractedData = JSON.parse(results.extractedData);
    } catch (error) {
      console.warn("Failed to parse extracted JSON data.");
    }

    // Send the summary and extracted data as JSON response
    res.json({
      summary: results.summaryText,
      extractedData,
      reformattedTranscript: results.reformattedTranscript,
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Error generating summary." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
