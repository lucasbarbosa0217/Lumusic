import React, { createContext, useState, useContext } from 'react';
import musicaJson from "../artist.json"
// Crie o contexto
const MusicContext = createContext();

// Componente Provider
export const MusicProvider = ({ children }) => {
  // Estado para a lista de músicas
  const [musicas, setMusicas] = useState(musicaJson.songs);

  const [musicaTocando, setMusicaTocando] = useState(null);

  const [musicaIndex, setMusicaIndex] = useState(null);

  function tocarMusica(index)  {
    setMusicaTocando(musicas[index].song);
    setMusicaIndex(index);
  };



  return (
    <MusicContext.Provider
      value={{
        musicas,
        musicaTocando,
        musicaIndex,
        tocarMusica,
        setMusicas,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
