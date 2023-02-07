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
import {Notice} from "../Notice/Notice";
import s from './styles.module.css';

export const FormAuth = ({title, field, reference, textButton, open, setOpen}) => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [textError, setTextError] = useState('')
    const [textSuccess, setTextSuccess] = useState('')
    const [_email, setEmail] = useState('')
    const [_password, setPassword] = useState('')
    const [_group, setGroup] = useState('')
    const [_token, setToken] = useState('')
    const theme = useTheme()
    const handleClose = () => setOpen(false)
    const {user: {userInfo, setUserInfo}, userAuthContext: {userAuth, setUserAuth}} = useContext(AppContext) //author: {name, avatar, about, email}
    const location = useLocation()
    const state = location.state
    const navigate = useNavigate()
    const token = localStorage.getItem('jwt')
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm({
        mode: "onBlur"
    })
    const loginPathTrue = location.pathname === '/login'
    const registrationPathTrue = location.pathname === '/registration'
    const resetPassPathTrue = location.pathname === '/reset_password'
    const changePassPathTrue = location.pathname === '/change_password'

    const request = (data) => {
        console.log('data.password', data.password, 'data.token', data.token)
        loginPathTrue && auth.authRequest(data)
            .then((userInfo) => {
                successAuth(userInfo)
            })
            .catch((response) => {
                console.log(response)
                rejectAuth(response)
            })
        registrationPathTrue && auth.requestRegistration(data)
            .then((userInfo) => {
                successAuth(userInfo)
            })
            .catch((response) => {
                console.log(response)
                rejectAuth(response)
            })
        resetPassPathTrue && auth.requestPasswordReset(data)
            .then((response) => {
                setSuccess(true)
                setError(false)
                setTextSuccess(response.message)
                // navigate(state.backgroundLocation.pathname)
            })
            .catch((error) => {
                rejectAuth(error)
            })
        changePassPathTrue && auth.requestPasswordChange(data, userInfo?.['_id'] ?? '622b6ffc09b12f80f4c10baa')
            .then((response) => {
                successAuth(response)
                setTextSuccess("Пароль успешно изменен!")
            })
            .catch((error) => {
                rejectAuth(error)
            })
    }

    useEffect(() => {
        setError(false)
        reset(() => {
                setEmail('')
                setGroup('')
                setPassword('')
                setToken('')
            }
        )
    }, [location.pathname, isSubmitSuccessful])

    function onFormSubmit(formData) {
        console.log(formData)
        request(formData)
    }

    function successAuth(userData) {
        console.log(userData ?? 'Неопределен')
        localStorage.setItem('jwt', userData?.['token']?.toString())
        setUserInfo(userData?.['data'])
        setUserAuth(userData?.['data'] || false)
        setSuccess(true)
        setError(false)
        navigate(state.backgroundLocation.pathname)
    }

    function rejectAuth(response) {
        response.json().then((error) => {
            console.log(error)
            setSuccess(false)
            setError(true)
            setTextError(error.message)
        })
    }

    return (
        <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={s.box}
                 sx={{boxShadow: 24}}
            >
                <IconButton onClick={handleClose}
                            sx={{position: 'absolute', top: '12px', right: '12px'}}>
                    <CloseIcon color='secondary'/>
                </IconButton>
                <Typography variant="h6"
                            sx={{alignSelf: 'center', mb: 3, mt: 4}}> {title} </Typography>
                <form className={s.form}
                      onSubmit={handleSubmit(onFormSubmit)}>
                    {field.email &&
                    <TextField {...register('email')}
                               required
                               fullWidth
                               value={_email}
                               onChange={(change) => {
                                   setEmail(change.target.value)
                               }}
                               label='E-mail'
                               margin='normal'
                               size='small'
                    />}
                    {field.group &&
                    <TextField {...register('group')}
                               required
                               fullWidth
                               value={_group}
                               onChange={(change) => {
                                   setGroup(change.target.value)
                               }}
                               label='Группа'
                               margin='normal'
                               size='small'
                    />}
                    {field.token &&
                    <TextField {...register('token')}
                               required
                               fullWidth
                               value={_token}
                               onChange={(change) => {
                                   setToken(change.target.value)
                               }}
                               label='Токен'
                               margin='normal'
                               size='small'
                    />}
                    {field.password &&
                    <TextField {...register('password')}
                               required
                               fullWidth
                               value={_password}
                               onChange={(change) => {
                                   setPassword(change.target.value)
                               }}
                               type='password'
                               label='Пароль'
                               margin='normal'
                               autoComplete='current-password'
                               size='small'
                    />}
                    {reference?.map((elem, ind) => {
                        return <Link key={ind}
                                     className={s.link}
                                     to={elem.ref}
                                     state={{backgroundLocation: location.state.backgroundLocation}}
                                     replace
                                     style={{}}>
                            <Typography color='primary' sx={{fontSize: '15px'}}
                            > {elem.title} </Typography>
                        </Link>
                    })}
                    {error && <Notice typeNotice={'error'} textNotice={textError}/>}
                    {success && <Notice typeNotice={'success'} textNotice={textSuccess}/>}
                    <Button type={'submit'}
                            sx={{mt: '35px', width: 'fit-content'}}
                            variant="outlined"
                            color={'secondary'}>{textButton}</Button>
                </form>
                <Button onClick={() => {
                    localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYWEiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.kNUaeZ45lQxfJ4eqWeas3wsPKwvk4r9uWOX5BbjlKL8')
                    navigate('/')
                }}
                >Логин форс</Button>
            </Box>
        </Modal>
    )
}
