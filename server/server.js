const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");

// Ensure the 'uploads/' and 'transcripts/' directories exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
if (!fs.existsSync("transcripts")) {
  fs.mkdirSync("transcripts");
}

const app = express();
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
