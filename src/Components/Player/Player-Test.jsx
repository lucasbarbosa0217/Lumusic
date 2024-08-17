import React, { useState, useRef, useEffect } from 'react';
import './Player-Test.css';
import Music_Title from '../Music-Title/Music-Title';
import { useMusic } from '../../Context/MusicContext';
import { ArrowDown, Infinity, Pause, Play, Queue, SkipBack, SkipForward, X } from '@phosphor-icons/react';
import { useSwipeable } from 'react-swipeable';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const seeker = useRef(null);
  const [max, setMax] = useState(0);
  const { musicas, setMusicas, musicaTocando, musicaIndex, tocarMusica } = useMusic();

  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const collapsedRef = useRef(null);
  const expandedRef = useRef(null);

  const [isLoop, setLoop] = useState(false);
  const [loopIcon, setLoopIcon] = useState("regular");
  const [scroll, setScroll] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (isLoop) {
      setLoopIcon("fill");
    } else {
      setLoopIcon("regular");
    }
  }, [isLoop]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: musicaTocando.name,
        artist: musicaTocando.artistName,
        album: musicaTocando.albumName,
        artwork: [
          { src: `${musicaTocando.albumCover}`, sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setPositionState({
        duration: max,
        playbackRate: 1,
        position: currentTime
      });
    }
  }, [musicaTocando, max, currentTime]);

  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      previous();
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      next();
    });
  }

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
      if (!isNaN(audioElement.duration)) {
        setMax(audioElement.duration);
      }
    };

    const handleEnded = () => {
      if (!isLoop) {
        next();
      }
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

  useEffect(() => {
    const collapsedElement = collapsedRef.current;
    const expandedElement = expandedRef.current;

    if (collapsedElement) {
      setCollapsedHeight(Number(collapsedElement.scrollHeight + 16));
    }
    if (expandedElement) {
      setExpandedHeight(Number(expandedElement.scrollHeight + 32));
    }
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoop = () => {
    setLoop(!isLoop);
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

  const handleExpand = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    if (expand) {
      setTimeout(() => {
        setScroll(true);
      }, 500);
    } else {
      setScroll(false);
    }
  }, [expand]);


  const handlers = useSwipeable({
    onSwipedDown: () => {
      if (expand && window.innerHeight > window.innerWidth) {
handleExpand()
    }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div
      {...handlers}
      className={`music-player transition-all duration-300 max-h-[75vh] ${scroll && "overflow-auto"}`}
      style={{
        height: expand ? `${expandedHeight}px` : `${collapsedHeight}px`,
      }}
    >
      <div className={`${!expand ? `h-fit` : "h-0 overflow-hidden"}`} ref={collapsedRef}>
        <div className="progress-bar-container flex flex-row w-full">
          <input
            className="flex-grow"
            type="range"
            value={currentTime}
            max={max}
            onChange={handleSeek}
            ref={seeker}
          />
          <div className="current-time">{formatTime(currentTime)}</div>
        </div>
        <div className="player-controls">
          <button
            className="flex flex-start flex-grow text-start"
            onClick={handleExpand}
          >
            <Music_Title song={musicaTocando} />
          </button>
          <div>
            <button onClick={handlePlayPause} className="play-pause">
              {isPlaying ? (
                <Pause size={40} color="#fcafad" />
              ) : (
                <Play size={40} color="#fcafad" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div  className={`p-8 pt-0  items-center flex flex-col ${expand ? `h-fit  ` : "h-0"}`} ref={expandedRef}>
        <div className="flex flex-col justify-between  pb-2 items-center w-full">
          <button
            onClick={handleExpand}
            className="p-6 px-8 rounded-3xl"
          >
            <div className='bg-[#fcafad] w-24 h-1'></div>
          </button>
          <p className="text-1xl font-bold">{musicaTocando.albumName}</p>
        </div>

        <img
          src={musicaTocando.albumCover}
          className="max-w-80 rounded-lg shadow-lg "
        />
        <p className="self-start text-3xl font-bold mt-4">
          {musicaTocando.name}
        </p>
        <p className="self-start text-2xl">{musicaTocando.artistName}</p>
        <div className="progress-bar-container flex flex-row w-full">
          <input
            className="flex-grow"
            type="range"
            value={currentTime}
            max={max}
            onChange={handleSeek}
            ref={seeker}
          />
          <div className="current-time">{formatTime(currentTime)}</div>
        </div>

        <div className="flex flex-row gap-2 mt-8 justify-between w-full lg:mt-2">
          <button className="play-pause">
            <Infinity onClick={handleLoop} weight={loopIcon} size={40} color="#fcafad" />
          </button>
          <button className="play-pause">
            <SkipBack
              onClick={previous}
              onDoubleClick={doublePrevious}
              size={40}
              color="#fcafad"
            />
          </button>
          <button onClick={handlePlayPause} className="play-pause">
            {isPlaying ? (
              <Pause size={40} color="#fcafad" />
            ) : (
              <Play size={40} color="#fcafad" />
            )}
          </button>
          <button className="play-pause">
            <SkipForward onClick={next} size={40} color="#fcafad" />
          </button>
          <button className="play-pause">
            <Queue weight="regular" size={40} color="#fcafad" />
          </button>
        </div>
      </div>

      <audio
        src={`https://${musicaTocando.songLink}`}
        ref={audioRef}
        autoPlay
        controls={false}
        loop={isLoop}
      />
    </div>
  );
};

export default MusicPlayer;
