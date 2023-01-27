import React from "react";
import {Alert as AlertMui, AlertTitle,} from '@mui/material';

export const Alert = ({title, text, severity}) => {

    return (
        <AlertMui severity={severity} sx={{mt: '20px'}}>
            <AlertTitle>{title}</AlertTitle>
            {text}
        </AlertMui>
    )
}