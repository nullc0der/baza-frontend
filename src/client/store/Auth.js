const INITIAL_STATE = {
    isAuthenticated: false,
    token: ''
}

const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
const authenticateUser = token => ({
    type: AUTHENTICATE_USER,
    token
})

const DEAUTHENTICATE_USER = 'DEAUTHENTICATE_USER'
const deauthenticateUser = () => ({
    type: DEAUTHENTICATE_USER
})

export const actions = {
    authenticateUser,
    deauthenticateUser
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, isAuthenticated: true, token: action.token }
        case DEAUTHENTICATE_USER:
            return { ...state, isAuthenticated: false, token: '' }
        default:
            return state
    }
}
