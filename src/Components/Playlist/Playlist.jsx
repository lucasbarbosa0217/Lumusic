import React from "react";
import "../../Vars.css"
import "./Playlist.css"
import PlaylistImg from "../../assets/playlist.png"

const Playlist = () => {
    return (
        <>
        <div className="playlist-container">
            <div className="playlist-header">
                <button>
                    <img width="50" height="50" src="https://img.icons8.com/ios/50/fcafad/circled-left-2.png" alt="circled-left-2"/>
                </button>
            </div>
            <div className="title-playlist">
                <img src={PlaylistImg}></img>
                <h1>Músicas Curtidas</h1>
            </div>
        </div>
        </>
    )
}

export default Playlist;