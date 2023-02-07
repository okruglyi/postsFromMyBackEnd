import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = ({open}) => {

    return (
        <Backdrop
            transitionDuration={{appear: 100, enter: 100, exit: 200}}
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}
