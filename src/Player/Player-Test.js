import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './Player-Test.css';
import Music_Title from '../Music-Title/Music-Title';

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.audioEl.current?.currentTime || 0);
    };
  
    const audioElement = audioRef.current?.audioEl.current;
  
    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }
    
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
    
  }, []);
  

  const handlePlayPause = () => {
    const audio = audioRef.current.audioEl.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    const audio = audioRef.current.audioEl.current;

    if (audio) {
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="music-player">
     
      <ReactAudioPlayer
        src={"https://"+song.songLink}
        ref={audioRef}
        autoPlay={false}
        controls={false}
      />
      <div className="player-controls">
        <Music_Title song={song}></Music_Title>
        <button onClick={handlePlayPause} className='play-pause'>
          {isPlaying ? (
            <img width="50" height="50" src="https://img.icons8.com/ios/50/fcafad/pause--v1.png" alt="pause--v1" />
          ) : (
            <img width="50" height="50" src="https://img.icons8.com/ios/50/fcafad/play--v1.png" alt="play--v1" />
          )}
        </button>
      </div>
      <div className="progress-bar-container">
        <input
          type="range"
          value={currentTime}
          max={audioRef.current ? audioRef.current.audioEl.current.duration : 0}
          onChange={handleSeek}
        />
        <div className="current-time">{formatTime(currentTime)}</div>
      </div>
      {/* Adicione o nome da música, do artista, do álbum e a foto da capa do álbum aqui */}
    </div>
  );
};

export default MusicPlayer;
