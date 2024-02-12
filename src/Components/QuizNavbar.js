import {AiFillPicture, AiFillQuestionCircle, AiOutlineLogout, AiOutlineMessage} from "react-icons/ai"; // Import Bootstrap components

import { Navbar, Container } from 'react-bootstrap';
import React from "react"; // Import Bootstrap components


function QuizNavbar() {
    return (
        <div style={style.container_navbar}>
            <ul style={style.icon_group}>
                <a href={"#profile"}>
                    <AiFillPicture style={style.icon}/>
                </a>
                <a href={"#messages"}>
                    <AiOutlineMessage style={style.icon}/>
                </a>
                <a href={"#help"}>
                    <AiFillQuestionCircle style={style.icon}/>
                </a>
                <a href={"#logout"}>
                    <AiOutlineLogout style={style.icon}/>
                </a>
            </ul>
            <div>
                <a href={"#logout"}>
                    <AiOutlineLogout style={style.logo}/>
                </a>
            </div>
        </div>

    );
}

const style = {
    container_navbar: {
        fontSize: '1.9rem',
    },

    icon_group: {
        float: 'left',
        color: 'rgb(0, 0, 0.8)',
    },

    icon: {
        color: 'rgb(0, 0, 0.8)',
    },

    logo: {
        float: 'right',
        paddingTop: '10px',
    },


};


export default QuizNavbar;
