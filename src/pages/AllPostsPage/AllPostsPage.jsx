import React, {useContext, useEffect, useState} from "react";
import {Posts} from "../../components/Posts/Posts";
import {AppContext} from "../../context/appContext";
import {Box, Button, Container} from '@mui/material';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Spinner} from "../../components/Spinner/Spinner";
import {Sort} from "../../components/Sort/Sort";
import SortIcon from '@mui/icons-material/Sort';
import Grid2 from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {SimpleDialog} from "../../components/SimpleDialog/SimpleDialog";
import {api} from "../../utils/Api";

export const AllPostsPage = ({posts, handleSort, sortOrder, token}) => {
    const {postsOnPage, loadingState: {isLoading}, page: {page, setPage}} = useContext(AppContext);
    const countPosts = posts?.length
    const countPage = Math.ceil(countPosts / postsOnPage)
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogChoice, setDialogChoice] = useState(false)
    const [postId, setPostId] = useState(0)
    const tabs = [
        {
            id: 'newerDate',
            title: 'новые',
            iconDirect: <SortIcon/>,
            iconReverse: <SortIcon sx={{rotate: '0deg'}}/>,
        },
        {
            id: 'earlierDate',
            title: 'старые',
            iconDirect: <SortIcon/>,
            iconReverse: <SortIcon sx={{rotate: '180deg'}}/>,
        },
        {
            id: 'moreLikes',
            title: 'популярные',
            iconDirect: <SortIcon/>,
            iconReverse: <SortIcon sx={{rotate: '0deg'}}/>,
        },
    ]
    /*    function elementHasPair(inputString) {
            return inputString.split('').reduce((result, currentValue, index) => {
                if (currentValue === '(') result += 1
                if (currentValue === ')') result -= 1
                return result
            }, 0) === 0
        }

        console.log('1) elementHasPair: ', elementHasPair('((()((()(()()()()(()(()()()_))(('))
        console.log('2) elementHasPair: ', elementHasPair('(()())'))*/

    useEffect(() => {
        console.log('Выполнение апи удаления поста ', dialogChoice)
        dialogChoice && api.deletePost(postId, token)
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [dialogChoice]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    function handleOpenDeleteDialog(postId) {
        console.log(postId)
        setOpenDialog(true)
        setPostId(postId)
    }

    function handleCloseDialog(choice) {
        setDialogChoice(choice)
        setOpenDialog(false)
    }

    return (
        <>
            <Container maxWidth={'xl'} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Link to={`/posts`} style={{textDecoration: 'none', alignSelf: 'flex-end'}}>
                    <Button
                        sx={{mt: 3, mb: 1, pr: 3}}
                        variant={'outlined'}
                    >
                        <AddIcon sx={{m: '3px 6px 3px 2px'}}/>
                        Добавить пост
                    </Button>
                </Link>
                <Box sx={{width: '350px'}}>
                    <Sort tabs={tabs} handleSort={handleSort} sortOrder={sortOrder}
                          key={3}/>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        minHeight: '95vh',
                        flexDirection: 'column',
                        // backgroundColor: '#b8fcaa',
                        m: '20px',
                    }}>
                    {
                        isLoading
                            ? (<Spinner open={true}/>)
                            : posts &&
                            (<>
                                {!isLoading &&
                                <Posts posts={posts} page={page} handleOpenDeleteDialog={handleOpenDeleteDialog}/>}
                                <Box sx={{mt: 4, mb: 1}}>
                                    {!isLoading && countPosts > 0 &&
                                    <Stack spacing={1} sx={{alignItems: 'center'}}>
                                        <Typography align={'center'}>Страница: {page}</Typography>
                                        <Pagination size={'large'} page={page} count={countPage}
                                                    onChange={handleChange}/>
                                    </Stack>}
                                </Box>
                            </>)
                    }
                </Box>
                <SimpleDialog
                    openDialog={openDialog}
                    handleCloseDialog={handleCloseDialog}
                    title={'Удаление поста'}
                    text={'Вы уверены, что хотите удалить пост?'}
                />
            </Container>
        </>
    )
}
