import React, {useContext, useState} from "react";
import {Post} from "../Post/Post";
import s from './styles.module.css';
import {AppContext} from "../../context/appContext";
import {Box, Grid} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import {Link} from "react-router-dom";

export const Posts = ({page, handleOpenDeleteDialog}) => {

    const {postsOnPage, postsObj: {posts}} = useContext(AppContext);

    return (
        // <Box sx={{flexGrow: 1}}>
        <Grid2 container spacing={{xs: 0, sm: 2, md: 2, lg: 2}} columns={{xs: 12, sm: 12, md: 12, lg: 12}}
               sx={{justifyContent: 'center'}}>
            {posts?.map((p, i) => {
                    return (
                        (page - 1) * postsOnPage <= i && i < postsOnPage * page && (
                            <Grid2 xs={12} sm={5} md={4} lg={3} key={i}>
                                <Post {...p} key={p['_id']} handleOpenDeleteDialog={handleOpenDeleteDialog}/>
                            </Grid2>
                        ))
                }
            )}
        </Grid2>
        // </Box>
    )
}