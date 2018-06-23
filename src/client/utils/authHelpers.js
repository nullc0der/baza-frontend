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
        const auth = store.getState().Auth
        if (auth.isAuthenticated) {
            if (auth.emailVerification === 'mandatory' && !auth.emailVerified) {
                return false
            }
            return true
        }
    }

    static getToken() {
        return store.getState().Auth.authToken
    }

    static register(username = '', email = '', password = '', password1 = '') {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('register/', {
                username: username,
                email: email,
                password: password,
                password1: password1
            }).then(response => {
                if (response.problem === 'NETWORK_ERROR') {
                    reject(
                        'There is some problem while registering, Try again later'
                    )
                }
                resolve(response.data)
            })
        })
    }

    static login(username = '', password = '', rememberUser = false) {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('login/', {
                username: username,
                password: password
            }).then(response => {
                if (response.ok) {
                    store.dispatch(
                        authActions.authenticateUser(
                            response.data.access_token,
                            response.data.email_verification,
                            response.data.email_verified
                        )
                    )
                    if (rememberUser) {
                        saveLocalState(store.getState())
                    }
                    resolve(response.data)
                } else if (response.problem === 'NETWORK_ERROR') {
                    reject(
                        'There is some problem while logging in, Try again later'
                    )
                }
                resolve(response.data)
            })
        })
    }

    static logout() {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('logout/', {
                access_token: this.getToken()
            }).then(response => {
                if (response.ok) {
                    store.dispatch(authActions.deauthenticateUser())
                    removeLocalState()
                    resolve(true)
                }
                resolve(false)
            })
        })
    }

    static validateEmail(validationKey) {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('validateemail/', {
                validation_key: validationKey
            }).then(response => {
                if (response.ok) {
                    resolve(response.data)
                }
                reject(response.data)
            })
        })
    }

    static initiateForgotPassword(email) {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('initiateforgotpassword/', {
                email: email
            }).then(response => {
                if (response.ok) {
                    resolve(response.data)
                }
                reject(response.data)
            })
        })
    }

    static resetPassword(password, password1, resetToken) {
        return new Promise((resolve, reject) => {
            api.setHeader('Content-Type', 'application/json')
            api.post('forgotpassword/', {
                password: password,
                password1: password1,
                reset_token: resetToken
            }).then(response => {
                if (response.ok) {
                    resolve(response.data)
                }
                reject(response.data)
            })
        })
    }
}
