import React from "react";
import s from './styles.module.css';
import logo from './img/pngegg.png';
import {Link} from "react-router-dom";

export const Logo = ({nameClass}) => {
    return (
        <Link to='/' className={s[nameClass]}>
            <img src={logo} alt="logo"/>
        </Link>
    )
}