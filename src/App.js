import { useEffect, useState } from 'react';
import './App.css';
import ListMusic from './ListMusic/ListMusic';
import Menu from './Menu/Menu';
import Player_Test from './Player/Player-Test';
import Playlist from './Playlist/Playlist';
import songList from "./artist.json"
function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    setSongs(songList.songs)
    //fetch('http://localhost:4200/songs')
      //.then(response => response.json())
      //.then(data => {
       // console.log(data)
        //setSongs(data);
      //})
      //.catch(error => console.error('Erro ao buscar os dados:', error));
  }, []);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setIsPlayerVisible(true);
    setPlayerKey(prevKey => prevKey + 1);
  };

  const handlePlayerClose = () => {
    setIsPlayerVisible(false);
    setSelectedSong(null);
  };

  return (
    <>
      <div className='body'>
        <div className='top'>
          <Playlist></Playlist>

          {songs.map((song, index) => (
            <ListMusic key={index} song={song.song} onClick={() => handleSongClick(song.song)} />
          ))}
        </div>
        <div className='bottom'>
          {/* Renderizar Player_Test apenas se uma música for selecionada */}
          {isPlayerVisible && <Player_Test key={playerKey} song={selectedSong} onClose={handlePlayerClose} />}
          <Menu></Menu>
        </div>
      </div>
    </>
  );
}

export default App;
