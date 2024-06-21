# Mood-Driven Melodies

Mood-Driven Melodies is a React application that plays music based on the user's detected emotion through speech recognition. The application captures user input through voice and determines the emotion expressed. It then selects and plays a song corresponding to the detected emotion.

## Features

- Uses the browser's SpeechRecognition API to capture user input through voice.
- Determines the user's emotion using a pre-trained emotion recognition model from Hugging Face.
- Selects a song based on the detected emotion and plays it.
- Provides pre-defined suggestions for user input to simulate different emotional states.
- Displays song information including title, artist, and album artwork.
- Includes controls to play/pause the song and track progress.

## Technologies Used

- React.js: A JavaScript library for building user interfaces.
- SpeechRecognition API: Enables speech recognition capabilities in web applications.
- Hugging Face API: Provides pre-trained models for natural language processing tasks.
- HTML5 Audio: Used to play audio files within the browser.

## Installation and Setup

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.

## Usage

1. Launch the application by running `npm start`.
2. Click the "Start Listening" button to enable speech recognition.
3. Speak into your microphone to express an emotion.
4. Alternatively, click one of the pre-defined suggestion buttons.
5. The application will detect the emotion and play a corresponding song.

## Emotion Recognition Model

The application utilizes the T5-base-finetuned-emotion model from Hugging Face's model hub for emotion recognition. The model is trained to classify text inputs into six emotion categories: joy, love, fear, surprise, sadness, and anger.

## Credits

- This application was created by K.S.V.S Karthik
- Emotion recognition model provided by Hugging Face.
- Music tracks sourced from NaaSongs website.

## License

This project is licensed under the [MIT License](LICENSE).
