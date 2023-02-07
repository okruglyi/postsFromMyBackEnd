import React from "react";
import {Logo} from "../Logo/Logo";
import s from './styles.module.css';

export const Footer = ({children}) => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                {/*<Logo nameClass='inFooter'/>*/}
                {children}
            </div>
        </footer>
    )
}
