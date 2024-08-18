import React from "react";
import "../../Vars.css";
import "./Menu.css";
import { useMusic } from "../../Context/MusicContext";
import { Book, House, Queue } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const Menu = () => {
    const { expand } = useMusic();
    const { cor } = useMusic();

    return (
        <>
                    <div
                        className="menu-container"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <a href="#" className="menu-option">
                            <Queue size={32} color={cor} />
                        </a>
                        <a href="#" className="menu-option">
                            <House size={32} color={cor} />
                        </a>
                        <a href="#" className="menu-option">
                            <Book size={32} color={cor} />
                        </a>
                    </div>
     
        </>
    );
};

export default Menu;
