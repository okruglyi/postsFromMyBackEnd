import React, {useContext, useEffect, useState} from "react";
import Typography from '@mui/material/Typography';
import {
    Box,
    Button,
    TextField,
    Alert,
    AlertTitle,
} from '@mui/material';
import {AppContext} from "../../context/appContext";
import {useForm} from "react-hook-form";
import {api} from "../../utils/Api";


export const PostChange = () => {
    const [_title, _setTitle] = useState('')
    const [_text, _setText] = useState('')
    const [_image, _setImage] = useState('')
    const [_tags, _setTags] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {handleLike, user: {userInfo}, loadingState: {isLoading, setIsLoading}} = useContext(AppContext)
    const {register, handleSubmit, reset} = useForm({
        mode: "onBlur",
    })
    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        boxShadow: 'none',
        p: 4,
    };

    /*    const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
},
    '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
},
    '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
},
});*/

    function handleStringTags(inputString) {
        return inputString.split(/[,.;]/).map((el) => el.trim())
    }

    function handleValidate(e) {
        // console.log(e.target.value === '' ? true : false)
        // e.target.value === '' ? setError(true) : setError(false)
    }

    function handleImgLoadError(e) {
        const newStyle = e.target.style

        newStyle.width = '100%'
        newStyle.height = '30vh'
        newStyle.border = '1px solid rgba(100, 100, 100, 50%)'
    }

    function onFormSubmit({tags: tagsArray, ...postData}) {
        const tags = handleStringTags(tagsArray);

        api.setNewPost({...postData, tags})
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
                Создать новый пост
            </Typography>
            <form onSubmit={handleSubmit(onFormSubmit)}
                  style={{display: 'flex', flexDirection: 'column', marginTop: '12px'}}>
                <TextField
                    {...register("title")}
                    fullWidth
                    label='Заголовок поста'
                    // error={error}
                    margin='normal'
                    // value={_title}
                    size='medium'
/*                    onBlur={(e) => {
                        handleValidate(e)
                        console.log(e.target.value)
                    }}*/
                    // onChange={(e) => {
                    //     _setTitle(e.target.value)
                    // }}
                />
                <TextField
                    {...register('image')}
                    fullWidth
                    label='Изображение'
                    margin='normal'
                    // value={_image}
                    size='small'
                    // onChange={(e) => {
                    //     _setImage(e.target.value)
                    // }}
                />
                {/*                <ValidationTextField
                    label="CSS validation style"
                    required
                    variant="outlined"
                    id="validation-outlined-input"
                />*/}
                <TextField
                    {...register('text')}
                    label={'Текст поста'}
                    // error={error}
                    rows={'10'}
                    multiline
                    // value={_text}
                    margin='normal'
                    size='medium'
/*                    onBlur={(e) => {
                        handleValidate(e)
                    }}*/
                    // onChange={(e) => {
                    //     _setText(e.target.value)
                    // }}
                />

                <TextField
                    {...register('tags')}
                    fullWidth
                    label='Тэги'
                    margin='normal'
                    // value={_tags}
                    size='small'
                    // onChange={(e) => {
                    //     _setTags(e.target.value)
                    // }}
                />
                {/*{error &&  <FormHelperText error>Не все обязательные поля заполнены</FormHelperText>}*/}
                {
                    success && !error
                        ? <Alert severity="success" sx={{mt: '20px'}}>
                            <AlertTitle>Успех</AlertTitle>
                            Пост успешно изменен!
                        </Alert>
                        : (
                            !success && error
                                ? <Alert severity="error" sx={{mt: '20px'}}>
                                    <AlertTitle>Ошибка</AlertTitle>
                                    Ошибка при изменении поста!
                                </Alert>
                                : <Button
                                    size={'small'}
                                    type={'submit'}
                                    color={'primary'}
                                    variant={'outlined'}
                                    sx={{mt: '20px', width: 'fit-content', alignSelf: 'center', p: '10px'}}>Разместить
                                    пост</Button>
                        )
                }
            </form>
        </Box>
    )
}