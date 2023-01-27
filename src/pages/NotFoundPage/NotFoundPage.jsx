import React from "react";
import {Box, Container} from "@mui/material";
import Typography from "@mui/material/Typography";

export const NotFoundPage = ({children}) => {
    return (
        <Container maxWidth={'md'}>
            <Box
                sx={{
                    display: 'flex',
                    height: '100%',
                    minHeight: '90vh',
                    // backgroundColor: '#b8fcaa',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0',
                }}
            >
                <Typography
                    variant={'h4'}>
                    404 Страница не найдена
                </Typography>
                {children}
            </Box>
        </Container>
    )
}