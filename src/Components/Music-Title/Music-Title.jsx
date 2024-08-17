import React, { useEffect, useState } from 'react';
import "../../Vars.css";
import "./Music-Title.css";

const Music_Title = ({ song }) => {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const container = document.getElementById('musicContainer');
    const text = document.getElementById('musicName');

    const handleAnimation = () => {
      setAnimate(text.scrollWidth > container.clientWidth);
    };

    handleAnimation();

    window.addEventListener('resize', handleAnimation);

    return () => {
      window.removeEventListener('resize', handleAnimation);
    };
  }, []);

  return (
    <>
      <div className="music-container__titleimg">
        <div className="music-container__image">
          <img src={song?.albumCover} className='album-cover' alt="Album Cover"></img>
        </div>
        <div className='music-info'>
          <div className="music-text" id="musicContainer">
            <span className={`music-name ${animate ? 'animate' : ''}`} id="musicName">
              {song?.name ?? "erro"}
            </span>
          </div>
          <div className='bottom-text-music'>
            <span className="artist-name">{song?.artistName ?? "erro"}</span>
            <span>&#8226;</span>
            <span className='album-name'>{song?.albumName ?? "erro"}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Music_Title;