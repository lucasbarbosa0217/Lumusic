import React  from "react";
import "../Vars.css"
import "./Menu.css"

const Menu = () => {
    return(
        <>
        <div className="menu-container">
            <a href="#" className="menu-option"><img width="50" height="50" src="https://img.icons8.com/ios/50/fcafad/list--v1.png" alt="list--v1"/></a>
            <a href="#"className="menu-option"><img width="48" height="48" src="https://img.icons8.com/ios/50/fcafad/home--v1.png" alt="home--v1"/></a>
            <a href="#"className="menu-option"><img width="50" height="50" src="https://img.icons8.com/ios/50/fcafad/plus--v1.png" alt="plus--v1"/></a>
        </div>
        </>
    )
}

export default Menu;