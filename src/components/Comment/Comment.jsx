import React, {useContext, useState} from 'react'
import {Box, Divider, Paper, Typography, CardActions, IconButton} from "@mui/material";
import {User} from "../User/User";
import DeleteIcon from '@mui/icons-material/Delete';
import {AppContext} from "../../context/appContext";

export const Comment = ({
                            _id,
                            text,
                            author,
                            post: {_id: postId, ...other},
                            created_at,
                            updated_at,
                            handleDeleteComment
                        }) => {

    const {user: {userInfo,}} = useContext(AppContext)
    console.log(userInfo?.['_id'])
    console.log(author?.['_id'])

    return (
        <Paper
            elevation={2}
            square
            sx={{
                p: '16px 16px',
                m: '4px',
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'start',
                width: 'calc(100% - 4px)',
                minHeight: '100px'
            }}
        >
            <Box sx={{width: '40vw', maxWidth: '200px'}}>
                <User anyUser={author}/>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem sx={{m: '10px'}}/>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '60vw'}}>
                <Typography variant="caption" display="block" gutterBottom
                            sx={{
                                display: 'inner-flex',
                                alignSelf: 'end',
                                mr: 1,
                                opacity: '60%',
                            }}>
                    {new Intl.DateTimeFormat('ru-RU', {
                        dateStyle: 'medium',
                        timeStyle: 'medium'
                    }).format(new Date(created_at))}
                </Typography>
                <Typography variant="body2" sx={{m: 1}}>
                    {text}
                </Typography>
                {userInfo?.['_id'] === author?.['_id'] && <IconButton
                    aria-label="Удалить комметарий"
                    onClick={() => handleDeleteComment(...[postId, , _id])}
                    sx={{alignSelf: 'end', width: '40px'}}>
                    <DeleteIcon color="action"/>
                </IconButton>}
            </Box>
        </Paper>
    )
}
