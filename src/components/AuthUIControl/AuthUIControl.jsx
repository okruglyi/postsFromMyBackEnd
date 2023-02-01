import React from 'react';
import {User} from "../User/User";
import {useContext} from "react";
import {AppContext} from "../../context/appContext";
import {Link, useLocation} from "react-router-dom";
import {IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export const AuthUIControl = ({handleLogout}) => {
    const {userAuthContext: {userAuth, setUserAuth}, user: {userInfo}} = useContext(AppContext)
    const location = useLocation()

    return (
        userAuth
            ? (<div style={{"display": "flex"}}>
                <Link
                    style={{textDecoration: 'none'}}
                    to={'/profile'}
                    state={{backgroundLocation: location}}>
                    <User {...userInfo} size={'70px'} nameClass='inHeader' clickable={true}/>
                </Link>
                <IconButton style={{height: 'fit-content', alignSelf: 'center'}}
                            onClick={handleLogout}>
                    <LogoutIcon color="secondary" sx={{fontSize: '35px'}}/>
                </IconButton>
            </div>)
            : (<Link
                to={'/login'}
                state={{backgroundLocation: location}}>
                <IconButton style={{height: 'fit-content', alignSelf: 'center'}}
                            onClick={handleLogout}>
                    <LoginIcon color="secondary" sx={{fontSize: '35px'}}/>
                </IconButton>
            </Link>)

    )
}

