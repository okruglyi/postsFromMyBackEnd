import React, {useContext, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Button, Container} from '@mui/material';
import {AppContext} from "../../context/appContext";
import Grid2 from "@mui/material/Unstable_Grid2";
import {api} from "../../utils/Api";
import {DetailedPost} from "../../components/DetailedPost/DetailedPost";
import {Spinner} from "../../components/Spinner/Spinner";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {PostCreate} from "../../components/PostCreate/PostCreate";

export const PostCreatePage = ({edit = false}, token) => {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState({})
    const [isError, serIsError] = useState(false)
    const {loadingState: {isLoading, setIsLoading}} = useContext(AppContext)
    const {postId} = useParams()
    const navigate = useNavigate();



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
                <PostCreate edit={edit} token={token}/>
            </Grid2>
        </Container>
    )
}
