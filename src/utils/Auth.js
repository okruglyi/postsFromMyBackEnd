class Auth {
    constructor({baseUrl}) {
        this.baseUrl = baseUrl;
    }

    authRequest(userData, token) {
        return fetch(`${this.baseUrl}/signin`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData)
            }
        )
            .then(onResponce)
    }

    requestRegistration(newUserData, token) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newUserData)
        })
            .then(onResponce)
    }

    requestValidationUser(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: token,
                "content-type": "application/json",
            }
        })
            .then(onResponce)
    }

    requestPasswordReset(userData) {
        return fetch(`${this.baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(onResponce)
    }

    requestPasswordChange(userData, userId, token) {
        return fetch(`${this.baseUrl}/password-reset/${userId}/${token}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData)
        })
            .then(onResponce)
    }
}

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

const conf = {
    baseUrl: "https://api.react-learning.ru",
}

export const auth = new Auth(conf)