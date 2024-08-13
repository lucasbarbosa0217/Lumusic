// ListMusic.js
import React from 'react';
import "../Vars.css";
import "./ListMusic.css";
import Music_Title from '../Music-Title/Music-Title';
import { Hamburger, Queue } from '@phosphor-icons/react';

const ListMusic = ({ song, onClick, onMenu }) => {
  return (
      <div className="music-select">
      <button className='music-container' onClick={onClick}>
        <Music_Title song={song}></Music_Title>
      </button>

        <button className="play-button queue">
          <Queue width={40} height={40} color="#fcafad" weight='fill' onClick={onMenu}></Queue>
        </button>
      </div>

  );
};

export default ListMusic;
