import React, {useEffect, useRef, useState} from "react";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {Logo} from "./components/Logo/Logo";
import {Footer} from "./components/Footer/Footer";
import {AllPostsPage} from "./pages/AllPostsPage/AllPostsPage";
import {PostPage} from "./pages/PostPage/PostPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {User} from "./components/User/User";
import {api} from "./utils/Api";
import {AppContext} from "./context/appContext";
import {Box, Container} from "@mui/material";
import {Search} from "./components/Search/Search";
import {useDebounce} from "./hooks/useDebounce";
import utils from './utils/Utils';
import {Profile} from "./components/Profile/Profile";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {purple} from "@mui/material/modern/colors";
import {PostCreatePage} from "./pages/PostCreatePage/PostCreatePage";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const App = () => {
    const sortDefault = 'newerDate';
    const [page, setPage] = useState(1);
    const [userInfo, setUserInfo] = useState([])
    const [posts, setPosts] = useState([])
    const [postsOnPage, setPostsOnPage] = useState(20)
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const delayedSearchQuery = useDebounce(searchQuery, 300)
    const firstRender = useRef(true)
    const [sortOrder, setSortOrder] = useState(sortDefault)
    const [open, setOpen] = useState(false)
    const [userAuth, setUserAuth] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state
    const theme = createTheme({
        palette: {
            primary: {
                // Purple and green play nicely together.
                main: '#01A54E',
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#000000',
            },
        },
    });

    useEffect(() => {
        setIsLoading(true)

        Promise.all([api.getUserInfo(), api.getAllPosts()])
            .then(([resUserInfo, resPosts]) => {
                setUserInfo(resUserInfo)
                setPosts(utils.doSort(resPosts, sortOrder))

            })
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            handleSearchRequest();
        }
    }, [delayedSearchQuery])

    function handleSearchRequest() {
        setIsLoading(true)
        api
            .searchPosts(delayedSearchQuery)
            .then((resPosts) => {
                setPosts(utils.doSort(resPosts, sortOrder))
                setPage(1)
            })
            .catch((error) => {
                console.log(`Error: ${error}`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleSearchInput(value) {
        setSearchQuery(value)
    }

    function handleSort(id) {
        setSortOrder(id)
        setPosts(utils.doSort(posts, id))
    }

    function handleLike(postId, isMeLiked, setIsMeLiked, setLikes = () => {
    }) {
        isMeLiked
            ? api.deleteLike(postId)
                .then((newPost) => {
                    setLikes(newPost['likes'])
                    setPosts(posts?.map((post) => {
                        return post?.['_id'] === postId ? newPost : post
                    }))
                    setIsMeLiked(!isMeLiked)
                })
            : api.setLike(postId)
                .then((newPost) => {
                    setLikes(newPost['likes'])
                    setPosts(posts?.map((post) => {
                        return post?.['_id'] === postId ? newPost : post
                    }))
                    setIsMeLiked(!isMeLiked)
                })
    }

    return (
        <AppContext.Provider
            value={{
                postsOnPage: postsOnPage,
                loadingState: {isLoading, setIsLoading},
                handleLike: handleLike,
                userAuth: userAuth,
                postsObj: {posts: posts, setPosts: setPosts},
                user: {userInfo: userInfo, setUserInfo: setUserInfo},
                page: {page: page, setPage: setPage},
            }}>
            <ThemeProvider theme={theme}>
                <Header>
                    <FavoriteIcon/>
                    <LogoutIcon/>
                    <Logo nameClass={'inHeader'}/>
                    {location.pathname === '/' &&
                    <Search searchQuery={searchQuery} handleSearchInput={handleSearchInput}/>}
                    {
                        userAuth
                            ? (<>
                                <Link
                                    style={{textDecoration: 'none'}}
                                    to={'/profile'}
                                    state={{backgroundLocation: location}}>
                                    <User {...userInfo} size={'70px'} nameClass='inHeader' clickable={true}/>
                                </Link>
                            </>)
                            : (<Link
                                to={'/login'}
                                state={{backgroundLocation: location}}>
                                Логин
                            </Link>)
                    }
                </Header>
                <main className='content container'>
                    <Routes location={state?.backgroundLocation || location}>
                        <Route
                            path="/"
                            element={
                                <AllPostsPage posts={posts} handleSort={handleSort} sortOrder={sortOrder}/>
                            }
                        />
                        <Route
                            path='/posts/:postId'
                            element={<PostPage/>}
                        />
                        <Route
                            path='/posts'
                            element={<PostCreatePage/>}
                        />
                        <Route
                            path='/posts/edit/:postId'
                            element={<PostCreatePage edit/>}
                        />
                        <Route
                            path="*"
                            element={<NotFoundPage/>}
                        />
                    </Routes>
                    {state?.backgroundLocation && (
                        <Routes>
                            <Route
                                path={'/profile'}
                                element={<Profile open={true} setOpen={() => navigate(-1)} {...posts}/>}
                            />
                        </Routes>)}
                </main>
                <Footer/>
            </ThemeProvider>
        </AppContext.Provider>
    )
}