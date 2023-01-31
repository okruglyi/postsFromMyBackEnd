import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Button, Container} from '@mui/material';
import {AppContext} from "../../context/appContext";
import Grid2 from "@mui/material/Unstable_Grid2";
import {api} from "../../utils/Api";
import {DetailedPost} from "../../components/DetailedPost/DetailedPost";
import {Spinner} from "../../components/Spinner/Spinner";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PostPage = () => {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState({})
    const [isError, serIsError] = useState(false)
    const {loadingState: {isLoading, setIsLoading}} = useContext(AppContext)
    const {postId} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        Promise.all([api.getPost(postId), api.getPostComments(postId)])
            .then(([respPost, respComments]) => {
                setPost(respPost)
                setComments(respComments)
            })
            .catch(() => serIsError(true))
            .finally(() => setIsLoading(false))
    }, [postId])

    function handleComment(postId, commentText, commentId) {

        commentId
            ? api.deletePostComment(postId, commentId)
                .then((respPost) => {
                    setPost(respPost)

                    api.getPostComments(postId)
                        .then((respComment) => {
                            setComments(respComment)
                        })
                })
            : api.setPostComment(postId, commentText)
                .then((respPost) => {
                    setPost(respPost)

                    api.getPostComments(postId)
                        .then((respComment) => {
                            setComments(respComment)
                        })
                })

        /*            ? api.deletePostComment(postId, commentId)
                        .then((respPost) => {

                        })
                    : api.setPostComment(postId, commentText)
                        .then((respPost) => {

                        })*/


    }

    function handleDeleteComment(postId, commentId) {

    }

    return (
        <Container maxWidth={'xl'}>
            <Grid2
                sx={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '95vh',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: '0',
                    pt: 5,
                    pb: 6,
                    pl: 8,
                    pr: 8,
                }}
                container>
                <Button
                    color='primary'
                    sx={{alignSelf: 'start', mb: 3, pr: 3}}
                    variant={'outlined'}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon sx={{m: '3px 6px 3px 2px'}}/>
                    Назад
                </Button>
                {
                    isLoading
                        ? (<Spinner open={true}/>)
                        : (post && !isError && <DetailedPost
                            post={post}
                            comments={comments}
                            handleComment={handleComment}
                            handleDeleteComment={handleComment}
                        />)
                }
            </Grid2>
        </Container>
    )
}
