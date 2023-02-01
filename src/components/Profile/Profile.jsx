import React, {useContext, useState} from "react";
import {Box, Modal, Typography, TextField, Button, IconButton} from "@mui/material";
import {User} from "../User/User";
import {AppContext} from "../../context/appContext";
import {useForm} from "react-hook-form";
import {api} from "../../utils/Api";
import CloseIcon from '@mui/icons-material/Close';

export const Profile = ({open, setOpen}) => {
    const handleClose = () => setOpen(false)
    const {user: {userInfo, setUserInfo}} = useContext(AppContext) //author: {name, avatar, about, email}
    const [_name, _setName] = useState(userInfo?.name)
    const [_about, _setAbout] = useState(userInfo?.about)
    const [_avatar, _setAvatar] = useState(userInfo?.avatar)
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        mode: "onBlur",
    })
    const style = {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
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

    function onFormSubmit({avatar, ...data}) {
        Promise.all([api.editUserInfo(data), api.editAvatar({avatar: avatar})])
            .then(([newUserInfo, newAvatar]) => {
                setUserInfo({...newUserInfo, newAvatar})
            })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
            >
                <IconButton onClick={handleClose} sx={{position: 'absolute', top: '14px', right: '14px'}}>
                    <CloseIcon color='secondary'/>
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" sx={{alignSelf: 'center', mb: 3}}>
                    Профиль
                </Typography>
                <div style={{marginLeft: '16px'}}>
                    <User size={'150px'}/>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '12px',
                          width: '-webkit-fill-available'
                      }}>
                    <TextField
                        {...register('name')}
                        fullWidth
                        label='Имя'
                        margin='normal'
                        value={_name}
                        size='small'
                        onChange={(e) => {
                            _setName(e.target.value)
                        }}
                    />
                    <TextField
                        disabled
                        fullWidth
                        label='Email'
                        margin='normal'
                        value={userInfo?.email}
                        size='small'
                    />
                    <TextField
                        {...register('about')}
                        fullWidth
                        label='О себе'
                        margin='normal'
                        value={_about}
                        size='small'
                        onChange={(e) => {
                            _setAbout(e.target.value)
                        }}
                    />
                    <TextField
                        {...register('avatar')}
                        fullWidth
                        label='Аватар'
                        margin='normal'
                        value={_avatar}
                        size='small'
                        onChange={(e) => {
                            _setAvatar(e.target.value)
                        }}
                    />
                    <Button type={'submit'} sx={{color: '#000', mt: '20px'}}>Изменить данные</Button>
                </form>
            </Box>
        </Modal>
    )
}
