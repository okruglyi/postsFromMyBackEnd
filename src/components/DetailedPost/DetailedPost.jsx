import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
    Avatar,
    Box, breadcrumbsClasses,
    Button,
    CardActionArea,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    TextareaAutosize,
    TextField
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {red} from '@mui/material/colors';
import {AppContext} from "../../context/appContext";
import {Tag} from "../Tag/Tag";
import {User} from "../User/User";
import Stack from "@mui/material/Stack";
import {Comment} from "../Comment/Comment";
import {useForm} from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';

export const DetailedPost = ({post, comments, handleComment, handleDeleteComment}) => {
    const {
        title,
        image,
        _id,
        tags,
        author,
        text,
        created_at,
        updated_at,
        likes,
    } = post
    const {handleLike, user: {userInfo}, loadingState: {isLoading, setIsLoading}} = useContext(AppContext)
    const [likesN, setLikesN] = useState(likes)
    const [isMeLiked, setIsMeLiked] = useState(likes?.some((like) => like === userInfo?.['_id']))
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()

    // console.log(post)

    // console.log(comments)

    function handleClick() {
        handleLike(_id, isMeLiked, setIsMeLiked, setLikesN)
    }

    function handleImgLoadError(e) {
        const newStyle = e.target.style

        newStyle.width = '100%'
        newStyle.height = '30vh'
        newStyle.border = '1px solid rgba(100, 100, 100, 50%)'
    }

    function onFormSubmit({...comment}) {
        handleComment(_id, comment)
        reset()
    }

    function handleEditPost() {
        navigate(`/posts/edit/${_id}`)
    }

    return (
        <Card sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'none'
        }}>
            <CardHeader
                sx={{pt: 2, pb: 3, pl: 0, pr: 0}}
                title={title}
                titleTypographyProps={{noWrap: false}}
            />
            <CardMedia
                sx={{
                    objectFit: 'contain',
                    minHeight: '30vh',
                    maxHeight: '50vh',
                    alignSelf: 'start',
                }}
                component="img"
                image={image}
                onError={(e) => handleImgLoadError(e)}

            />
            <CardContent
                sx={{pt: 3, pb: 3, pl: 0, pr: 0}}
            >
                <Typography variant="body1" paragraph={true}>
                    {text}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: 'space-between', pl: 0, pr: 0}}>
                <User anyUser={author}/>
                <Box>
                    <IconButton disabled={author?.['_id'] !== userInfo?.['_id']} onClick={handleEditPost}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={handleClick}
                    >
                        {isMeLiked && (
                            <>
                                <FavoriteIcon sx={{color: red[300], mr: 1}}/>
                                {likesN?.length > 0 && <Typography variant="body2" color="text.secondary" noWrap>
                                    {likesN?.length}
                                </Typography>}
                            </>)}
                        {!isMeLiked && (
                            <>
                                <FavoriteBorderIcon sx={{mr: 1}}/>
                                {likesN?.length > 0 && <Typography variant="body2" color="text.secondary" noWrap>
                                    {likesN?.length}
                                </Typography>}
                            </>
                        )}
                    </IconButton>
                </Box>
            </CardActions>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    pt: 1, pb: 0, pl: 0, pr: 0,
                    m: 0,
                    overflow: 'hidden',
                    minHeight: '55px',
                }}
                component="ul"
            >
                <Typography
                    variant="body2"
                    sx={{
                        display: 'inner-flex',
                        alignSelf: 'center',
                        mr: 1,
                        opacity: '60%',
                    }}>тэги </Typography>
                {tags?.map((tag) => <Tag tag={tag} key={tag + '_' + _id}/>)}
            </Box>
            <Divider sx={{mt: 3, mb: 3}}/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant={'overline'} color="text.secondary">
                    Написать комментарий
                </Typography>
                <Box sx={{mb: 1}}>
                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        style={{width: '100%', mb: '100px', display: 'flex', flexDirection: 'column'}}
                    >
                        <TextField
                            {...register('text')}
                            style={{width: '100%', alignSelf: 'center'}}
                            multiline
                            rows={4}
                            fullWidth
                            label='Текст отзыва'
                            margin='normal'
                        />
                        <Button color={'primary'}
                                type={'submit'}
                                sx={{width: 'initial', alignSelf: 'flex-end', mt: 1}}>Прокомментировать</Button>
                    </form>
                    <Typography variant={'overline'} color="text.secondary">
                        {(() => {
                            switch (comments?.length) {
                                case 1:
                                    return 'Комментарий'
                                    break
                                case 2:
                                case 3:
                                case 4:
                                    return 'Комментария'
                                    break
                                case 0:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                case 9:
                                    return 'Комментариев'
                                    break
                                default:
                                    return 'Комментариев'
                                    break
                            }
                        })()} ({comments?.length})
                    </Typography>
                </Box>
                <Stack>
                    {comments?.length > 0 && comments?.map((comment) => {
                        return <Comment
                            {...comment}
                            post={post}
                            key={comment?.['_id']}
                            handleDeleteComment={handleDeleteComment}
                        />
                    })}
                </Stack>
            </Box>

        </Card>
    )
}