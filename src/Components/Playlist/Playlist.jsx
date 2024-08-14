import React from "react";
import "../../Vars.css"
import "./Playlist.css"
import PlaylistImg from "../../assets/playlist.png"

const Playlist = () => {
    return (
        <>
        <div className="playlist-container flex-grow w-full">
            <div className="playlist-header">
                <button>
                    <img width="50" height="50" src="https://img.icons8.com/ios/50/fcafad/circled-left-2.png" alt="circled-left-2"/>
                </button>
            </div>
            <div className="title-playlist">
                <img src={PlaylistImg}></img>
                <h1 className="text-3xl font-bold p-4">Músicas Curtidas</h1>
            </div>
        </div>
        </>
    )
}

export default Playlist;