import React, {useContext, useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {IconButton, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const Search = ({searchQuery, handleSearchInput}) => {
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        setSearchText(searchQuery)
    })

    function handleOnChange(e) {
        handleSearchInput(e.target.value)
    }

    function handleClearSearch() {
        handleSearchInput('')
    }

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
            }}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Поиск"
                inputProps={{'aria-label': 'Строка поиска'}}
                onChange={handleOnChange}
                value={searchText}
                type={'text'}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search" onClick={handleClearSearch}>
                {/*{searchQuery && <SearchIcon/>}*/}
                {searchQuery && <SearchOffIcon/>}
            </IconButton>
        </Paper>
    )
}
