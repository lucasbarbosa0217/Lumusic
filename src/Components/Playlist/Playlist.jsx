import React from "react";
import "../../Vars.css"
import "./Playlist.css"

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
                    <img src="https://firebasestorage.googleapis.com/v0/b/lusmic-ef813.appspot.com/o/playlist.png?alt=media&token=70c09c9a-7745-4ca3-94c5-a60216b0fef5"></img>
                <h1 className="text-3xl font-bold p-4">Músicas Curtidas</h1>
            </div>
        </div>
        </>
    )
}

export default Playlist;