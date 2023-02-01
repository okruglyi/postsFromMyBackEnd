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
import {Typography} from "@mui/material";
import {Search} from "./components/Search/Search";
import {useDebounce} from "./hooks/useDebounce";
import utils from './utils/Utils';
import {Profile} from "./components/Profile/Profile";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {purple} from "@mui/material/modern/colors";
import {PostCreatePage} from "./pages/PostCreatePage/PostCreatePage";
import {FormAuth} from "./components/FormAuth/FormAuth";
import {AuthUIControl} from "./components/AuthUIControl/AuthUIControl";
import {auth} from "./utils/Auth";

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
    const [userAuth, setUserAuth] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state
    const token = localStorage.getItem('jwt')
    const path = location.pathname
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
        Promise.all([api.getUserInfo(token), api.getAllPosts(token)])
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
    }, [userAuth])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            navigate('/')
            handleSearchRequest();
        }
    }, [delayedSearchQuery])

    useEffect(() => {
        if (path !== '/login' && path !== '/registration') handleAuthValidation()
    }, [location.pathname])

    function handleSearchRequest() {
        setIsLoading(true)
        api
            .searchPosts(delayedSearchQuery, token)
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
            ? api.deleteLike(postId, token)
                .then((newPost) => {
                    setLikes(newPost['likes'])
                    setPosts(posts?.map((post) => {
                        return post?.['_id'] === postId ? newPost : post
                    }))
                    setIsMeLiked(!isMeLiked)
                })
            : api.setLike(postId, token)
                .then((newPost) => {
                    setLikes(newPost['likes'])
                    setPosts(posts?.map((post) => {
                        return post?.['_id'] === postId ? newPost : post
                    }))
                    setIsMeLiked(!isMeLiked)
                })
    }

    function handleAuthValidation() {
        if (token) {
            auth.requestValidationUser(token)
                .then((userInfo) => {
                    setUserInfo(userInfo)
                    setUserAuth(true)
                })
                .catch((response) => {
                    console.log(response?.status)
                    if (response?.status === 401) handleLogout()
                })
        } else handleLogout()
    }

    function handleLogout() {
        if (token) localStorage.removeItem('jwt');
        setUserAuth(false)
        navigate('/login', {state: {backgroundLocation: location}})
    }

    return (
        <AppContext.Provider
            value={{
                postsOnPage: postsOnPage,
                loadingState: {isLoading, setIsLoading},
                handleLike: handleLike,
                userAuthContext: {userAuth: userAuth, setUserAuth: setUserAuth},
                postsObj: {posts: posts, setPosts: setPosts},
                user: {userInfo: userInfo, setUserInfo: setUserInfo},
                page: {page: page, setPage: setPage},
            }}>
            <ThemeProvider theme={theme}>
                <Header>
                    <Logo nameClass={'inHeader'}/>
                    {userAuth && <Search searchQuery={searchQuery} handleSearchInput={handleSearchInput}/>}
                    <AuthUIControl handleLogout={handleLogout}/>
                </Header>
                <main className='content container'>
                    {userAuth &&
                    <>
                        <Routes location={state?.backgroundLocation || location}>
                            <Route
                                path="/"
                                element={
                                    <AllPostsPage posts={posts} handleSort={handleSort} sortOrder={sortOrder}
                                                  token={token}/>
                                }
                            />
                            <Route
                                path='/posts/:postId'
                                element={<PostPage token={token}/>}
                            />
                            <Route
                                path='/posts'
                                element={<PostCreatePage edit={false} token={token}/>}
                            />
                            <Route
                                path='/posts/edit/:postId'
                                element={<PostCreatePage edit={true} token={token}/>}
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
                                    element={<Profile open={true} token={token} setOpen={() => navigate(-1)}/>}
                                />
                            </Routes>)}
                    </>}
                    {state?.backgroundLocation && (
                        <Routes>
                            <Route
                                path={'/login'}
                                element={<FormAuth open={true} setOpen={() => navigate(-1)}/>}
                            />
                            <Route
                                path={'/registration'}
                                element={<FormAuth open={true} setOpen={() => navigate(-1)}/>}
                            />
                        </Routes>)}
                </main>
                <Footer>
                    <Typography>Здесь будет общая информация</Typography>
                </Footer>
            </ThemeProvider>
        </AppContext.Provider>
    )
}
