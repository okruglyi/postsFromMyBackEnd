import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Typography from '@mui/material/Typography';
import {
    Box,
    Button,
    TextField,
} from '@mui/material';
import {AppContext} from "../../context/appContext";
import {useForm} from "react-hook-form";
import {api} from "../../utils/Api";
import {Alert} from "../Alert/Alert";

export const PostCreate = ({edit = false}, token) => {
    const [_title, _setTitle] = useState('')
    const [_text, _setText] = useState('')
    const [_image, _setImage] = useState('')
    const [_tags, _setTags] = useState('')
    const [post, setPost] = useState({})
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {handleLike, user: {userInfo}, loadingState: {isLoading, setIsLoading}} = useContext(AppContext)
    const {register, handleSubmit, reset} = useForm({
        mode: "onBlur",
    })
    const {postId} = useParams()

    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        boxShadow: 'none',
        p: 4,
    };

    useEffect(() => {
        edit && api.getPost(postId)
            .then((resPost) => {
                setPost(resPost)
                _setTitle(resPost['title'])
                _setImage(resPost['image'])
                _setText(resPost['text'])
                _setTags(resPost['tags'])
            })
    }, [postId])

    function handleStringTags(inputString) {
        return inputString.split(/[,.;]/).map((el) => el.trim())
    }

    function onFormSubmit() {
        console.log(typeof(_tags),'  ',typeof(_tags) === 'object')
        const tags = typeof(_tags) === 'object' ? _tags : handleStringTags(_tags);
        const postData = {title: _title, image: _image, text: _text, tags}

        !edit
            ? api.setNewPost(postData, token)
                .then((respPost) => {
                    setSuccess(true)
                    reset()
                })
                .catch((error) => {
                    console.log(error)
                    setError(true)
                })

            : api.editCurrentPost(postId, postData, token)
                .then((respPost) => {
                    setSuccess(true)
                    reset()
                })
                .catch((error) => {
                    console.log(error)
                    setError(true)
                })
    }

    return (
        <Box
            sx={style}
        >
            <Typography variant="h5" sx={{alignSelf: 'start', mb: 3}}>
                {!edit ? '?????????????? ?????????? ????????' : '?????????????????????????? ????????'}
            </Typography>
            <form onSubmit={handleSubmit(onFormSubmit)}
                  style={{display: 'flex', flexDirection: 'column', marginTop: '12px'}}>
                <TextField
                    required={!edit}
                    fullWidth
                    label='?????????????????? ??????????'
                    margin='normal'
                    size='medium'
                    value={_title}
                    onChange={(e) => {
                        _setTitle(e.target.value)
                    }}
                />
                <TextField
                    required={!edit}
                    fullWidth
                    label='??????????????????????'
                    margin='normal'
                    size='small'
                    value={_image}
                    onChange={(e) => {
                        _setImage(e.target.value)
                    }}
                />

                <TextField
                    required={!edit}
                    label={'?????????? ??????????'}
                    rows={'10'}
                    multiline
                    margin='normal'
                    size='medium'
                    value={_text}
                    onChange={(e) => {
                        _setText(e.target.value)
                    }}
                />

                <TextField
                    fullWidth
                    label='????????'
                    margin='normal'
                    size='small'
                    value={_tags}
                    onChange={(e) => {
                        _setTags(e.target.value)
                    }}
                />
                {!edit && (success && !error
                        ? <Alert title={'??????????'} text={'???????? ???????????????? ??????????????!'} severity={"success"}/>
                        : (
                            !success && error
                                ? <Alert title={'????????????'} text={'???????????? ?????? ???????????????????? ??????????!'} severity={"error"}/>
                                : <Button
                                    size={'small'}
                                    type={'submit'}
                                    color={'primary'}
                                    variant={'outlined'}
                                    sx={{mt: '20px', width: 'fit-content', alignSelf: 'center', p: '10px'}}>
                                    ???????????????????? ????????
                                </Button>
                        )
                )}
                {edit && (success && !error
                        ? <Alert title={'??????????'} text={'???????? ?????????????? ??????????????!'} severity={"success"}/>
                        : (
                            !success && error
                                ? <Alert title={'????????????'} text={'???????????? ?????? ?????????????????? ??????????!'} severity={"error"}/>
                                : <Button
                                    size={'small'}
                                    type={'submit'}
                                    color={'primary'}
                                    variant={'outlined'}
                                    sx={{mt: '20px', width: 'fit-content', alignSelf: 'center', p: '10px'}}>
                                    ???????????????? ????????
                                </Button>
                        )
                )}
            </form>
        </Box>
    )
}
