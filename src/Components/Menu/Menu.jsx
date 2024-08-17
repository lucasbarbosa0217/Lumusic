import React  from "react";
import "../../Vars.css"
import "./Menu.css"
import { useMusic } from "../../Context/MusicContext";
import { Book, House, Queue } from "@phosphor-icons/react";

const Menu = () => {

    const {cor} = useMusic()
    return(
        <>
        <div className="menu-container">
            <a href="#" className="menu-option"><Queue size={32} color={cor}/></a>
            <a href="#"className="menu-option"><House size={32} color={cor}/></a>
            <a href="#"className="menu-option"><Book size={32} color={cor}/></a>
        </div>
        </>
    )
}

export default Menu;