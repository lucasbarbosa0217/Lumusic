import React, { createContext, useState, useContext } from 'react';
import musicaJson from "../artist.json"
const MusicContext = createContext();

// Componente Provider
export const MusicProvider = ({ children }) => {
  // Estado para a lista de músicas
  const [musicas, setMusicas] = useState({});

  const [musicaTocando, setMusicaTocando] = useState(null);


  
  const [musicaIndex, setMusicaIndex] = useState(null);

  function tocarMusica(index, lista)  {
    if(!musicas){
      setMusicas(lista);
            setMusicas(lista);

    }
    
    setMusicaTocando(musicas[index].song);
    setMusicaIndex(index);
  };



  return (
    <MusicContext.Provider
      value={{
        musicas,
        musicaTocando,
        setMusicas,
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
