import React from "react";

export const AppContext = React.createContext({
    postsOnPage: 10,
    loadingState: {
        isLoading: false,
        setIsLoading: () => {
        }
    },
    handleLike: () => {
    },
    userAuth: false,
    postsObj: {
        posts: [],
        setPosts: () => {
        }
    },
    user: {
        userInfo: [],
        setUserInfo: () => {
        }
    },
    page: {
        page: 1,
        setPage: () => {
        }
    },
})

AppContext.displayName = 'AppContext';