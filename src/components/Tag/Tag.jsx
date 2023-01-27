import React, {useContext, useState} from "react";
import {AppContext} from "../../context/appContext";
import {Box, Chip, Grid, ListItem} from "@mui/material";

export const Tag = ({tag}) => {

    return (
        <ListItem sx={{width: 'auto', p: 0.2}}>
            {tag && <Chip
                label={tag.length > 30 ? tag.substr(0, 29) + '...' : tag}
                color='primary'
                variant='outlined'
                sx={{opacity: '50%'}}
            />}
        </ListItem>
    )
}