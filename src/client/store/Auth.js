const INITIAL_STATE = {
    isAuthenticated: false,
    authToken: '',
    emailVerification: 'mandatory',
    emailVerified: false,
    expiresIn: ''
}

const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
const authenticateUser = (
    authToken,
    emailVerification,
    emailVerified,
    expiresIn
) => ({
    type: AUTHENTICATE_USER,
    authToken,
    emailVerification,
    emailVerified,
    expiresIn
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
            return {
                ...state,
                isAuthenticated: true,
                authToken: action.authToken,
                emailVerification: action.emailVerification,
                emailVerified: action.emailVerified,
                expiresIn: action.expiresIn
            }
        case DEAUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: false,
                authToken: '',
                emailVerification: 'mandatory',
                emailVerified: false,
                expiresIn: ''
            }
        default:
            return state
    }
}
