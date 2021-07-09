import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';

const NavBar = (props) => {

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        theme=='dark' ? setTheme('light') : setTheme('dark');
        props.selectTheme();
    }

    return (
        <>
         <div className="navbar">
            <p className="title">Where in the world?</p>
            <div className="theme_button" onClick={toggleTheme}>
            <FontAwesomeIcon className="icon" icon={'fas', faMoon} />
            <p className="theme-text inline">{theme=='dark'?'Light':'Dark'} Mode</p>
            </div> 
        </div>
        </>
    )
}

export default NavBar;