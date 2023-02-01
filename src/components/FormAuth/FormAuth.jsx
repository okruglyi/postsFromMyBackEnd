import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Box, Grid, Modal, Paper, Typography, TextField, FormControl, Button, IconButton} from "@mui/material";
import {User} from "../User/User";
import {AppContext} from "../../context/appContext";
import {useForm} from "react-hook-form";
import {api} from "../../utils/Api";
import CloseIcon from '@mui/icons-material/Close';
import {auth} from "../../utils/Auth";
import {useTheme} from '@mui/material/styles';

export const FormAuth = ({open, setOpen}) => {
    const [error, setError] = useState(false)
    const [textErr, setTextErr] = useState('')
    const theme = useTheme()
    const handleClose = () => setOpen(false)
    const {user: {userInfo, setUserInfo}, userAuthContext: {userAuth, setUserAuth}} = useContext(AppContext) //author: {name, avatar, about, email}
    const location = useLocation()
    const navigate = useNavigate()
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: "onBlur",
    })
    const loginPathTrue = location.pathname === '/login'
    const registrationPathTrue = location.pathname === '/registration'
    const style = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    };
    const windowContent = {
        title: loginPathTrue && 'Авторизация' || registrationPathTrue && 'Регистрация',
        link: loginPathTrue && true || registrationPathTrue && false,
        button: loginPathTrue && 'Вход' || registrationPathTrue && 'Зарегистрироваться',
        request: (response) => {
            loginPathTrue && auth.authRequest(response)
                .then((userInfo) => {
                    successAuth(userInfo)
                })
                .catch((response) => {
                    rejectAuth(response)
                })
            registrationPathTrue && auth.requestRegistration(response)
                .then((userInfo) => {
                    successAuth(userInfo)
                })
                .catch((response) => {
                    rejectAuth(response)
                })
        }
    }
    useEffect(() => {
        setError(false)
    }, [location.pathname])

    function onFormSubmit(formData) {
        console.log(formData)
        windowContent.request(formData)
    }

    function successAuth(userData) {
        localStorage.setItem('jwt', userData['token'])
        setUserInfo(userData)
        setUserAuth(true)
        setError(false)
        navigate(state.backgroundLocation.pathname)
    }

    function rejectAuth(response) {
        response.json().then((error) => {
            console.log(error)
            setError(true)
            setTextErr(error.message)
        })
    }

    return (
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
            >
                <IconButton onClick={handleClose} sx={{position: 'absolute', top: '4px', right: '14px'}}>
                    <CloseIcon color='secondary'/>
                </IconButton>
                <Typography variant="h6" sx={{alignSelf: 'center', mb: 3, mt: 4}}>
                    {windowContent.title}
                </Typography>
                <form onSubmit={handleSubmit(onFormSubmit)}
                      style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '12px'}}>
                    <TextField
                        {...register('email')}
                        required
                        fullWidth
                        label='E-mail'
                        margin='normal'
                        size='small'
                    />
                    <TextField
                        {...register('password')}
                        required
                        fullWidth
                        type='password'
                        label='Пароль'
                        margin='normal'
                        autoComplete='current-password'
                        size='small'
                    />
                    {windowContent.link &&
                    <Link to='/registration'
                          state={{backgroundLocation: location.state.backgroundLocation}}
                          replace
                          style={{
                              alignSelf: 'flex-end',
                              marginTop: '10px',
                              color: theme.palette.primary.main
                          }}>
                        <Typography color='primary' sx={{fontSize: '15px'}}
                        > Регистрация </Typography>
                    </Link>}
                    <Typography sx={{mt: '20px', mb: '20px', fontSize: '13px', height: '20px'}}
                                color='error'
                    >
                        {error && textErr}
                    </Typography>
                    <Button type={'submit'} sx={{mt: '10px', width: 'fit-content'}}
                            variant="outlined" color={'secondary'}>{windowContent.button}</Button>
                </form>
            </Box>
        </Modal>
    )
}
