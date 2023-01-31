import React, {useContext} from "react";
import {Avatar, Box, Button, CardActionArea, CardHeader, Chip, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import {AppContext} from "../../context/appContext";

//name, about, avatar, _id, email,
export const User = ({anyUser, size = '50px', clickable = false}) => {
    const {user: userMe} = useContext(AppContext)
    const user = anyUser ? anyUser : userMe.userInfo

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <CardHeader
                avatar={
                    <Avatar
                        sx={{bgcolor: red[500], width: size, height: size}}
                        srcSet={user?.avatar}
                    />
                }
                // title={user?.name}
                titleTypographyProps={{noWrap: false, fontWeight: 400, color: 'secondary'}}
                sx={{clickable: clickable}}
            />
        </Box>
    )
}
