import React, {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Box, Modal, Typography, TextField, Button, IconButton} from "@mui/material";
import {User} from "../User/User";
import {AppContext} from "../../context/appContext";
import {useForm} from "react-hook-form";
import {api} from "../../utils/Api";
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

/* typeNotice : 'error' | 'success' */
export const Notice = ({typeNotice, textNotice}) => {
    return (
        <Alert severity={typeNotice} sx={{mt: '20px', mb: '20px'}}>
            {textNotice}
        </Alert>
    )
}
