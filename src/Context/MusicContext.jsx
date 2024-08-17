import React, { createContext, useState, useContext, useEffect } from 'react';
import musicaJson from "../artist.json"
import corMedia from '../util/AverageColor';
const MusicContext = createContext();


function hexToRgba(hex) {
  hex = hex.replace(/^#/, '');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return [`rgba(${r}, ${g}, ${b}, 0)`, `rgba(${r}, ${g}, ${b}, 1)`];
}

// Componente Provider
export const MusicProvider = ({ children }) => {
  // Estado para a lista de músicas
  const [musicas, setMusicas] = useState({});

  const [expand, setExpand] = useState(false);


  const [musicaTocando, setMusicaTocando] = useState(null);

  const [cor, setCor] = useState("#fcafab");

  const [musicaIndex, setMusicaIndex] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--main-color", cor);
    let rgba = hexToRgba(cor);

    document.documentElement.style.setProperty("--main-color-0-rgba", rgba[0]);
    document.documentElement.style.setProperty("--main-color-1-rgba", rgba[1]);

  }, [cor])


  function tocarMusica(index, lista) {
    if (!musicas) {
      setMusicas(lista);
      setMusicas(lista);

    }

    setMusicaTocando(musicas[index].song);
    setMusicaIndex(index);

    corMedia(musicas[index].song.albumCover).then((color) => setCor(color))
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
        cor,
        expand,
        setExpand
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);