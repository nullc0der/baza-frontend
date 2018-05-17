import { create } from 'apisauce'

import { store, saveLocalState, removeLocalState } from 'store'
import { actions as authActions } from 'store/Auth'

const baseURL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/api/v1/auth/'
        : '/api/v1/auth/'

const api = create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json'
    }
})

export default class Auth {
    static isAuthenticated() {
        return store.getState().Auth.isAuthenticated
    }

    static getToken() {
        return store.getState().Auth.token
    }

    static register(username = '', password1 = '', password2 = '') {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api
                .post('registration/', {
                    username: username,
                    password1: password1,
                    password2: password2
                })
                .then(response => {
                    if (response.ok) {
                        store.dispatch(
                            authActions.authenticateUser(response.data.key)
                        )
                        saveLocalState(store.getState())
                    }
                    resolve(response.data)
                })
        })
    }

    static login(username = '', password = '', rememberUser = false) {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api
                .post('login/', {
                    username: username,
                    password: password
                })
                .then(response => {
                    if (response.ok) {
                        store.dispatch(
                            authActions.authenticateUser(response.data.key)
                        )
                        if (rememberUser) {
                            saveLocalState(store.getState())
                        }
                    }
                    resolve(response.data)
                })
        })
    }

    static logout() {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('logout/').then(response => {
                if (response.ok) {
                    store.dispatch(authActions.deauthenticateUser())
                    removeLocalState()
                    resolve(true)
                }
                resolve(false)
            })
        })
    }
}
