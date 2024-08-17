import React from "react";
import "../../Vars.css"
import "./Playlist.css"
import { ArrowLeft } from "@phosphor-icons/react";
import { useMusic } from "../../Context/MusicContext";

const Playlist = () => {
    const {cor} = useMusic()
    return (
        <>
        <div className="playlist-container flex-grow w-full">
            <div className="playlist-header">
                <button>
                        <ArrowLeft size={42} color={cor}/>
                </button>
            </div>
            <div className="title-playlist">
                    <img src="https://firebasestorage.googleapis.com/v0/b/lusmic-ef813.appspot.com/o/playlist.png?alt=media&token=70c09c9a-7745-4ca3-94c5-a60216b0fef5"></img>
                <h1 className="text-3xl font-bold p-4">Músicas Curtidas</h1>
            </div>
        </div>
        </>
    )
}

export default Playlist;