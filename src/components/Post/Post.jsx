import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Avatar, Box, CardActionArea, CardActions, CardHeader, Divider, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {red} from '@mui/material/colors';
import {AppContext} from "../../context/appContext";
import {Tag} from "../Tag/Tag";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {SimpleDialog} from "../SimpleDialog/SimpleDialog";

export const Post = ({
                         title,
                         image,
                         _id,
                         tags,
                         author: {name, avatar, _id: authorId},
                         text,
                         created_at,
                         updated_at,
                         likes,
                         comments,
                         handleOpenDeleteDialog,
                     }) => {
    const {handleLike, user: {userInfo, setUserInfo}} = useContext(AppContext)
    const [isMeLiked, setIsMeLiked] = useState(likes.some((like) => like === userInfo?.['_id']))
    const navigate = useNavigate()


    function handleClickLike() {
        handleLike(_id, isMeLiked, setIsMeLiked)
    }

    function handleEditPost() {
        navigate(`/posts/edit/${_id}`)
    }



    return (
        <Card sx={{height: 'auto'}}>
            <Link to={`/posts/${_id}`} style={{textDecoration: 'none'}}>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{bgcolor: red[500]}}
                                srcSet={avatar}
                            />
                        }
                        title={title}
                        titleTypographyProps={{noWrap: false}}
                        subheader={new Date(created_at).toLocaleDateString()}
                    />
                    <CardMedia
                        sx={{objectFit: 'cover'}}
                        component="img"
                        width='100%'
                        height='200px'
                        image={image}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            {/*            <CardActions>
                <IconButton>
                    <EditIcon/>
                </IconButton>
            </CardActions>*/}
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handleClickLike}
                >
                    {isMeLiked && (
                        <>
                            <FavoriteIcon sx={{color: red[300], mr: 1}}/>
                            {likes?.length > 0 && <Typography variant="body2" color="text.secondary" noWrap>
                                {likes?.length}
                            </Typography>}
                        </>)}
                    {!isMeLiked && (
                        <>
                            <FavoriteBorderIcon sx={{mr: 1}}/>
                            {likes?.length > 0 && <Typography variant="body2" color="text.secondary" noWrap>
                                {likes?.length}
                            </Typography>}
                        </>
                    )}
                </IconButton>
                <IconButton>
                    <ModeCommentOutlinedIcon sx={{mr: 1}}/>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {comments?.length}
                    </Typography>
                </IconButton>
                <IconButton disabled={authorId !== userInfo?.['_id']} onClick={handleEditPost}>
                    <EditIcon/>
                </IconButton>
                <IconButton disabled={authorId !== userInfo?.['_id']} onClick={()=> handleOpenDeleteDialog(_id)}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
{/*            <Divider/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: '2px',
                    m: '10px',
                    overflow: 'hidden',
                    minHeight: '55px',
                    maxHeight: '100px',
                }}
                component="ul"
            >
                {tags?.map((tag) => <Tag tag={tag} key={tag + '_' + _id}/>)}
            </Box>*/}
        </Card>
    )
}