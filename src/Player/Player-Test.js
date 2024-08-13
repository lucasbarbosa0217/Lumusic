import React, { useState, useRef, useEffect } from 'react';
import './Player-Test.css';
import Music_Title from '../Music-Title/Music-Title';
import { useMusic } from '../Context/MusicContext';
import { Pause, Play, SkipBack, SkipForward } from '@phosphor-icons/react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const seeker = useRef(null);
  const [max, setMax] = useState(0);
  const { musicas, setMusicas, musicaTocando, musicaIndex, tocarMusica } = useMusic();

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
      if (!isNaN(audioElement.duration)) {
        setMax(audioElement.duration);
      }
    };

    const handleEnded = () => {
      next();
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, [musicaTocando, musicaIndex]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
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
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const previous = () => {
    if (currentTime > 5) {
      audioRef.current.currentTime = 0;
      return;
    }
    if (musicaIndex === 0) {
      tocarMusica(musicas.length - 1);
    } else {
      tocarMusica(musicaIndex - 1);
    }
  };

  const doublePrevious = () => {
    if (musicaIndex === 0) {
      tocarMusica(musicas.length - 1);
    } else {
      tocarMusica(musicaIndex - 1);
    }
  };

  const next = () => {
    if (musicas.length - 1 === musicaIndex) {
      tocarMusica(0);
    } else {
      tocarMusica(musicaIndex + 1);
    }
  };

  return (
    <div className="music-player">
      <audio
        src={`https://${musicaTocando.songLink}`}
        ref={audioRef}
        autoPlay
        controls={false}
      />
      <div className="player-controls">
        <Music_Title song={musicaTocando}></Music_Title>
        <div>
          <button className='play-pause'>
            <SkipBack onClick={previous} onDoubleClick={doublePrevious} size={32} color={`#fcafad`} />
          </button>
          <button className='play-pause'>
            <SkipForward onClick={next} size={32} color={`#fcafad`} />
          </button>
          <button onClick={handlePlayPause} className='play-pause'>
            {isPlaying ? (
              <Pause size={32} color={`#fcafad`} />
            ) : (
              <Play size={32} color={`#fcafad`} />
            )}
          </button>
        </div>
      </div>
      <div className="progress-bar-container">
        <input
          type="range"
          value={currentTime}
          max={max}
          onChange={handleSeek}
          ref={seeker}
        />
        <div className="current-time">{formatTime(currentTime)}</div>
      </div>
    </div>
  );
};

export default MusicPlayer;
