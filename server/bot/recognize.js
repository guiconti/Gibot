require('dotenv').config();
// [START speech_quickstart]
// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

// Your Google Cloud Platform project ID
const projectId = process.env.GOOGLE_PROJECT_NAME;

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
});

module.exports = (voicePath) => {
  return new Promise((resolve, reject) => {
    // The name of the audio file to transcribe
    const fileName = path.normalize(voicePath);
    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes
    };
    const config = {
      encoding: 'OGG_OPUS',
      sampleRateHertz: 16000,
      languageCode: 'pt-BR'
    };
    const request = {
      audio: audio,
      config: config
    };
  
    // Detects speech in the audio file
    speechClient.recognize(request)
      .then((data) => {
        const response = data[0];
        const transcription = response.results.map(result =>
            result.alternatives[0].transcript).join('\n');
        resolve(`Transcription: ${transcription}`);
        fs.unlinkSync(voicePath);
        return;
      })
      .catch((err) => {
        reject('Error:' + err);
        fs.unlinkSync(voicePath);
        return;
      });
  });
}
