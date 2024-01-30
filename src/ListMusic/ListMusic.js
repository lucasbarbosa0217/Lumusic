// ListMusic.js
import React from 'react';
import "../Vars.css";
import "./ListMusic.css";
import Music_Title from '../Music-Title/Music-Title';

const ListMusic = ({ song, onClick }) => {
  return (
    <button className='music-select' onClick={onClick}>
      <div className="music-container">
        <Music_Title song={song}></Music_Title>
        <div className="play-button">
          <img width="30" height="30" src="https://img.icons8.com/ios/50/fcafad/like--v1.png" alt="like--v1" />
        </div>
      </div>
    </button>
  );
};

export default ListMusic;
