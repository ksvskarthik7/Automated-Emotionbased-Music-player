import React, { useState, useEffect } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [emotion, setEmotion] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  //audio
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const [songData, setSongData] = useState({
    title: 'On and On',
    artist: 'feat. Daniel Levi',
    image: './music/channels4_profile (5).jpg',
    audio: './music/On-and-On(PaglaSongs).mp3',
  });

  let recognition = new SpeechRecognition();


  // useEffect(() => {
    
  // }, []);

  const toggleListening = () => {
    if (recognition) {
      if (!listening) {

        if (SpeechRecognition) {
          console.log("started")
          recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.continous=true
          
          recognition.start();

          recognition.onresult = function(event) {
            const finalTranscript = event.results[0][0].transcript;
            setTranscript(finalTranscript);
            console.log("transcript done")
            recognition.stop();
            setListening(false);
            recognizeEmotion(finalTranscript);
          };
        }

        
        setListening(true);
      } else {
        recognition.stop();
        setListening(false);
      }
    } else {
      console.error('Recognition object is not initialized.');
    }
  };

  // EMOTION RECOGNITION
  const recognizeEmotion = async (text) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-emotion",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify({ "inputs": text }),
        }
      );
      const result = await response.json();
      console.log(result[0].generated_text)
      setEmotion(JSON.stringify(result[0].generated_text));
      setSongData(getRandomSongDataForEmotion(result[0].generated_text));
    } catch (error) {
      console.error("Error in emotion recognition:", error);
    }
  };

  const playSong = () => {
    const audio = document.getElementById("audio3");
    audio.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    const audio = document.getElementById("audio3");
    audio.pause()
    setIsPlaying(false);
  };

  const getRandomSongDataForEmotion = (emotion) => {
    const songs = {
      joy: [
        {
          title: 'Chitti',
          artist: 'Jathi ratnalu',
          image: './music/joy/Jathi-Ratnalu-2021-jpeg.jpg',
          audio: './music/joy/Chitti - SenSongsMp3.Com.mp3',
        },
        {
          title: 'Vaaru Veeru antha chusthu unna',
          artist: 'Devadas',
          image: './music/joy/download.jpeg',
          audio: './music/joy/[iSongs.info] 01 - Vaaru Veeru.mp3',
        },
      ],
      love: [
        {
          title: 'Poolane Kunukeyamantaa',
          artist: 'Shreya Goshal, Haricharan',
          image: './music/love/maxresdefault.jpg',
          audio: './music/love/[iSongs.info] 04 - Poolane Kunukeyamantaa.mp3',
        },
        {
          title: 'Ninnu chuse anandamlo',
          artist : 'Sid sriram',
          image: './music/anger/Gang-Leader-Telugu-2019.jpg',
          audio: './music/love/[iSongs.info] 03 - Ninnu Chuse Anandamlo.mp3'
        }
      ],
      fear: [
        {
          title: 'Ye Mera jaha',
          artist: 'kushi',
          image:'./music/sadness/sddefault.jpg',
          audio: './music/[iSongs.info] 01 - Ye Mera Jaha.mp3'
        },
        {
          title: 'chal chalo chalo',
          artist: 'son of satyamurthy',
          image: './music/sadness/artworks-000621918658-3xjrto-t500x500.jpg',
          audio: './music/[iSongs.info] 06 - Chal Chalo Chalo.mp3'
        }
      ],
      surprise: [
        {
          title: 'Jare Jare',
          artist: 'Majnu',
          image: './music/surprise/dc-Cover-n2bklorpfpead0vjljg36efd07-20160923202115.Medi.jpeg',
          audio: './music/surprise/[iSongs.info] 04 - Jare Jare.mp3'
        }
      ],
      sadness : [
        {
          title: 'Yevaremi Anukunna',
          artist:'Budjet Padhbhanamam',
          image: './music/fear/download (1).jpeg',
          audio: './music/sadness/[iSongs.info] 05 - Yevaremi Anukunna.mp3'
        },
        {
          title: 'Aakasham nee hadhura',
          artist:'Aakasham nee hadhura',
          image: './music/fear/download (1).jpeg',
          audio: './music/sadness/[iSongs.info] 05 - Aakaasam Nee Haddhu Ra.mp3'
        }
      ],
      anger: [
        {
        title: 'vaasava suhaasa',
        artist: 'vinara bhagyamu vishnu katha',
        image: './music/anger/Gang-Leader-Telugu-2019.jpg',
        audio: './music/anger/[iSongs.info] 01 - Vaasava Suhaasa.mp3'
        },
        {
          title: 'Manasa sanchara',
          artist: 'shankarabharnam',
          image: './music/anger/Gang-Leader-Telugu-2019.jpg',
          audio: './music/anger/[iSongs.info] 08 - Manasa Sancharare.mp3'
        }
      ]
      // Add other emotions and their corresponding songs similarly
    };

    const randomIndex = Math.floor(Math.random() * songs[emotion].length);
    return songs[emotion][randomIndex];
  };

  //inline styling
  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    color: '#EAEAEA',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    //fontFamily: 'Indie Flower, cursive',
    fontFamily: 'Comic Sans MS',
  };

  const suggestionButtonStyle = {
    marginTop: '10px', marginRight: '18px',
    padding: '10px 20px',
    fontSize: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    color: '#CCCCCC', // Dark gray text color
    fontFamily: 'Walter Turncoat, sans-serif', // Font family
    border: 'none',
    borderRadius: '35px',
    cursor: 'pointer',
    background: '#333333', // Turquoise blue color
};
  
  const suggestionTexts = [
    "I'm feeling happy",
    "Feeling sad today",
    "Surprised!",
    "In a loving mood",
    "Feeling anxious",
    "what the hell is wrong with you today ",
  ];

  const setTranscriptFromSuggestion = (text) => {
    setTranscript(text);
    recognizeEmotion(text);
  };

  useEffect(() => {
    if (emotion) {
      playSong();
    }
  }, [emotion]);

  // Update audio current time
  const handleAudioTimeUpdate = (e) => {
    const audio = e.target;
    setAudioCurrentTime(audio.currentTime);
  };

  // Seek to a specific position in the song
  const seekTo = (time) => {
    const audio = document.getElementById("audio3");
    audio.currentTime = time;
  };

  // Calculate progress percentage
  const progress = (audioCurrentTime / audioDuration) * 100;
  
  return (
    <div className="voicecontainer">
      <h1>Mood-Driven Melodies</h1>
      <div className="suggestion-buttons">
        {suggestionTexts.map((text, index) => (
          <button key={index} style={suggestionButtonStyle} onClick={() => setTranscriptFromSuggestion(text)}>
            {text}
          </button>
        ))}
      </div>
      <div className="transcription">{transcript}</div>
      <button 
      style={buttonStyle}
      onClick={toggleListening}>
        {listening ? 'Listening...' : 'Start Listening'}
      </button>
      <h3 className="emotion">Detected Emotion: {emotion}</h3>

       {/* SONG WIDGET */}
       {emotion && (
         <div className="song-widget">
          <div className="song-info">
            <img src={songData.image} alt="Album Artwork" />
            <div>
              <h2>{songData.title}</h2>
              <p>{songData.artist}</p>
            </div>
          </div>
          <audio id="audio3" src={songData.audio} type="audio/mpeg" preload="none" onLoadedMetadata={(e) => setAudioDuration(e.target.duration)} onTimeUpdate={handleAudioTimeUpdate}></audio>
          <div className="progress-bar">
            <progress value={progress} max="100" onClick={(e) => seekTo((e.nativeEvent.offsetX / e.target.offsetWidth) * audioDuration)}></progress>
          </div>
          <div className="controls">
            <button className="playbutton" onClick={isPlaying ? pauseSong : playSong}>{isPlaying ? 'Pause' : 'Play'}</button>
          </div>
          
        </div>
       )}
    </div>
  );
}

export default App;
