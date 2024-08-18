import React, { useState, useRef, useEffect } from 'react';
import './Player-Test.css';
import Music_Title from '../Music-Title/Music-Title';
import { useMusic } from '../../Context/MusicContext';
import { ArrowDown, Infinity, Pause, Play, Queue, SkipBack, SkipForward, X } from '@phosphor-icons/react';
import { useSwipeable } from 'react-swipeable';
import Menu from '../Menu/Menu';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const seeker = useRef(null);
  const [max, setMax] = useState(0);
  const { musicas, setMusicas, musicaTocando, musicaIndex, tocarMusica, cor, expand, setExpand } = useMusic();

  const collapsedRef = useRef(null);
  const expandedRef = useRef(null);
  const [isLoop, setLoop] = useState(false);
  const [scroll, setScroll] = useState(false);


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
    navigator.mediaSession.setActionHandler('play', () => {
      handlePlayPause()
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      handlePlayPause()
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






  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);

    } else {
      audio.play();
      setIsPlaying(true);

    }
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
      if (expand && window.innerHeight > window.innerWidth && window.innerHeight > 739) {
        handleExpand();
      }
    },
  });


  const [touchEvents, setTouchEvents] = useState(false)

  useEffect(() => {
    if(window.innerHeight < 740){
      setTouchEvents(true)
    }else{
      setTouchEvents(false)
    }
  }, [window.innerHeight])
  

  return (
    <>

    <AnimatePresence mode="wait">
      {!expand ? (
      
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 , transitionEnd: {display: "none"}}}
            transition={{ duration: 0.2 }}
            className={"h-fit w-full flex flex-col gap-8 playercontainer"}
            ref={collapsedRef}>

            <div className=' bg-stone-50 p-2 m-4 mb-0 rounded-lg shadow-lg'>
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
              <div className="player-controls flex w-full overflow-hidden">
                <button
                  className="flex flex-start flex-grow text-start overflow-hidden"
                  onClick={handleExpand}
                >
                  <Music_Title song={musicaTocando} />
                </button>
                <div className='flex-shrink-0 flex items-center justify-center'>
                  <button onClick={handlePlayPause} className="play-pause">
                    {isPlaying ? (
                      <Pause size={40} color={cor} />
                    ) : (
                      <Play size={40} color={cor} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <Menu />
          </motion.div>
      
      
      ) : (
      

            <motion.div 
            key="expanded"
              initial={{ opacity: 0, y: 800 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 800, transitionEnd: { display: "none" } }}
              transition={{ duration: 0.3 }}
              className={`items-center max-h-[82dvh] w-full playercontainer ${scroll && "overflow-auto"}`} 
              ref={expandedRef}>
              <div {...handlers} className={`flex flex-col items-center  h-fit px-8 pb-16 pt-0 m-4 mb-0 rounded-t-3xl shadow-2xl bg-stone-50 ${touchEvents ? "touch-auto" : "touch-none"}`}>
                <div className="flex flex-col justify-between  pb-2 items-center w-full">
                  <button
                    onClick={handleExpand}
                    className="p-6 px-8 rounded-3xl"
                  >
                    <div className={`collapser w-24 h-1`}></div>
                  </button>
                  <p className="text-1xl font-bold whitespace-nowrap overflow-hidden w-full text-center">{musicaTocando.albumName}</p>
                </div>

                <img
                  src={musicaTocando.albumCover}
                  className="max-w-80 rounded-lg shadow-lg w-full "
                />
                <p className="self-start text-3xl font-bold mt-4 whitespace-nowrap overflow-hidden w-full" >
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
                    <Infinity onClick={handleLoop} weight={isLoop ? "fill" : "regular"} size={40} color={cor} />
                  </button>
                  <button className="play-pause">
                    <SkipBack
                      onClick={previous}
                      onDoubleClick={doublePrevious}
                      size={40}
                      color={cor}
                    />
                  </button>
                  <button onClick={handlePlayPause} className="play-pause">
                    {isPlaying ? (
                      <Pause size={40} color={cor} />
                    ) : (
                      <Play size={40} color={cor} />
                    )}
                  </button>
                  <button className="play-pause">
                    <SkipForward onClick={next} size={40} color={cor} />
                  </button>
                  <button className="play-pause">
                    <Queue weight="regular" size={40} color={cor} />
                  </button>
                </div>

              </div>

            </motion.div>
      
      
     )}
    


      </AnimatePresence>
      <audio
        src={`https://${musicaTocando.songLink}`}
        ref={audioRef}
        autoPlay
        controls={false}
        loop={isLoop}
      />
      </>
  );
};

export default MusicPlayer;
