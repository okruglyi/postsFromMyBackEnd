class Api {

  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl
    this._token = `Bearer ${token}`
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {
          authorization: token,
        }
      }).then(onResponce)
  }

  getPost(postId, token) {
    return fetch(`${this._baseUrl}/posts/${postId}`,
      {
        method: 'GET',
        headers: {
          authorization: token,
        }
      }).then(onResponce)
  }

  getAllPosts(token) {
    return fetch(`${this._baseUrl}/posts`,
      {
        method: 'GET',
        headers: {
          authorization: token,
        }
      }).then(onResponce)
  }

  searchPosts(searchQuery, token) {
    return fetch(`${this._baseUrl}/posts/search/?query=${searchQuery}`, {
      headers: {
        authorization: token,
      }
    }).then(onResponce)
  }

  editUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(onResponce)
  }

  editAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    }).then(onResponce)
  }

  setLike(postId, token) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      method: 'PUT',
      headers: {
        authorization: token,
      },
    }).then(onResponce)
  }

  deleteLike(postId, token) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    }).then(onResponce)
  }

  setNewPost(postData, token) {
    return fetch(`${this._baseUrl}/posts`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(onResponce)
  }

  editCurrentPost(postId, postData, token) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(onResponce)
  }

  deletePost(postId, token) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    }).then(onResponce)
  }

  getAllComments() {
  }

  getPostComments(postId, token) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      method: 'GET',
      headers: {
        authorization: token,
      },
    }).then(onResponce)
  }

  setPostComment(postId, commentText, token) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentText)
    }).then(onResponce)
  }

  deletePostComment(postId, commentId, token) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
      },
    }).then(onResponce)
  }
}

const onResponce = (res) => {
  return res?.ok ? res.json() : Promise.reject(res)
}

const initialParams = {
  baseUrl: 'https://api.react-learning.ru'
}

export const api = new Api(initialParams);
