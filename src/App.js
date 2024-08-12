import { useContext, useEffect, useState } from 'react';
import './App.css';
import ListMusic from './ListMusic/ListMusic';
import Menu from './Menu/Menu';
import Player_Test from './Player/Player-Test';
import Playlist from './Playlist/Playlist';
import songList from "./artist.json"
import { MusicProvider, useMusic } from './Context/MusicContext';

function App() {
  const [songs, setSongs] = useState([]);
  const [playerKey, setPlayerKey] = useState(0);
  const { musicas, musicaTocando, musicaIndex, tocarMusica, pararMusica, setCurrentIndex, } = useMusic();

 

  useEffect(() => {
    setSongs(musicas)
  }, []);

  const handleSongClick = (index) => {
    tocarMusica(index)
  };




  return (
    <>
      <div className='body'>
        <div className='top'>
          <Playlist></Playlist>

          {songs.map((song, index) => (
            <ListMusic key={index} song={song.song} onClick={() => handleSongClick(index)} />
          ))}
        </div>
        <div className='bottom'>
        


          {musicaTocando && <Player_Test />}
          <Menu></Menu>
        </div>
      </div>
    </>
  );
}

export default App;
