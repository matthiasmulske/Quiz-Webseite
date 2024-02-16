import {AiFillPicture, AiFillQuestionCircle, AiOutlineLogout, AiOutlineMessage} from "react-icons/ai"; // Import Bootstrap components

import React from "react";
import imageLogo from "../assets/logo.png";


function QuizNavbar() {
    return (
        <>
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
                        <a>
                            <img src={imageLogo} style={style.logo}/>
                        </a>
                </ul>
            </div>

        </>


    );
}

//import logo from "src/Components/logo.svg";


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

    /* CSS */
    logoContainer: {
    width: '100%', /* Set the width of the container */
    height: '100%', /* Set the height of the container */
    overflow: 'hidden', /* Hide any overflow */
    },

    logo: {
        float: '',
        height: '8%',
        width: '8%'

}


};


export default QuizNavbar;
