// ListMusic.js
import React, { useContext } from 'react';
import "../../Vars.css";
import "./ListMusic.css";
import Music_Title from '../Music-Title/Music-Title';
import { Hamburger, Queue } from '@phosphor-icons/react';
import { useMusic } from '../../Context/MusicContext';
import { Audio } from 'react-loader-spinner';



const ListMusic = ({ song, onClick, onMenu }) => {
  const {musicaTocando} = useMusic();

  return (
      <div className="music-select">
      <button className='music-container' onClick={onClick}>
        <Music_Title song={song}></Music_Title>
        {musicaTocando === song && <Audio height={40} width={40} color="#fcafad" ></Audio>}
      </button>

        <button className="play-button queue">
          <Queue width={40} height={40} color="#fcafad" weight='fill' onClick={onMenu}></Queue>
        </button>
      </div>

  );
};

export default ListMusic;
