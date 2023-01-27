import React from "react";
import s from './styles.module.css';
import cn from 'classnames';

export const Header = ({children}) => {
    return (
        <header className={s.header}>
            <div className={cn(s['header-wrapper'], 'container')}>
                {children}
            </div>
        </header>
    )
}