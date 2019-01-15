
const createAction = str => `HASHTAG_${str}`
const INITIAL_STATE = {
    providers: [
        { name: 'Google+', icon: 'google-plus', className: 'btn-gplus' },
        { name: 'Facebook', icon: 'facebook-f', className: 'btn-fb' }
    ],
    selectedProvider: 0
}

const CHANGE_PROVIDER = createAction('CHANGE_PROVIDER')
const changeProvider = (selectedProvider) => ({
    type: CHANGE_PROVIDER,
    selectedProvider
})


export const actions = {
    changeProvider
}

export default function HashTag(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_PROVIDER:
            return {
                ...state,
                selectedProvider: action.selectedProvider
            }
        default:
            return state
    }
}
