import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
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
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).send("Transcript is required.");
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5:generateText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Based on this transcript of a Patient and a Doctor, summarize the conversation in one paragraph:\n--------\n${transcript}`,
        }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text(); // Capture error details
      console.error("Error from Google API:", response.status, errorDetails);
      throw new Error(`Failed to fetch summary: ${errorDetails}`);
    }

    const data = await response.json();
    const summaryText = data.candidates[0].output;

    res.json({ summary: summaryText });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).send(`Error generating summary: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
