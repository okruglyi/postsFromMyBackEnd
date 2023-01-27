class Api {

    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl
        this._token = `Bearer ${token}`
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`,
            {
                method: 'GET',
                headers: {
                    authorization: this._token,
                }
            }).then(onResponce)
    }

    getPost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`,
            {
                method: 'GET',
                headers: {
                    authorization: this._token,
                }
            }).then(onResponce)
    }

    getAllPosts() {
        return fetch(`${this._baseUrl}/posts`,
            {
                method: 'GET',
                headers: {
                    authorization: this._token,
                }
            }).then(onResponce)
    }

    searchPosts(searchQuery) {
        return fetch(`${this._baseUrl}/posts/search/?query=${searchQuery}`, {
            headers: {
                authorization: this._token,
            }
        }).then(onResponce)
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avatar)
        }).then(onResponce)
    }

    setLike(postId) {
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    deleteLike(postId) {
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    setNewPost(postData) {
        return fetch(`${this._baseUrl}/posts`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(onResponce)
    }

    editCurrentPost(postId, postData) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(onResponce)
    }

    deletePost(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    getAllComments() {
    }

    getPostComments(postId) {
        return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }

    setPostComment(postId, commentText) {
        return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentText)
        }).then(onResponce)
    }

    deletePostComment(postId, commentId) {
        return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        }).then(onResponce)
    }
}

const onResponce = (res) => {
    return res?.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

const initialParams = {
    baseUrl: 'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYWEiLCJpYXQiOjE2NDcwMTM4ODUsImV4cCI6MTY3ODU0OTg4NX0.kNUaeZ45lQxfJ4eqWeas3wsPKwvk4r9uWOX5BbjlKL8'
}

export const api = new Api(initialParams);
