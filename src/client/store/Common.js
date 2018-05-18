// eslint-disable-next-line no-unused-vars
const debug = require('debug')('baza:store:common')

const INITIAL_STATE = {
    breadcrumbs: {
        title: 'Home',
        links: [{ href: '/', text: 'Home' }]
    },
    selectedDonation: {}
}

const SET_BREADCRUMBS = 'SET_BREADCRUMBS'
const setBreadCrumbs = data => ({
    type: SET_BREADCRUMBS,
    title: data.title,
    links: data.links
})

const SELECT_DONATION = 'SELECT_DONATION'
const selectDonation = selected => ({
    type: SELECT_DONATION,
    selected
})

export const actions = {
    setBreadCrumbs,
    selectDonation
}

export default function CommonReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_BREADCRUMBS:
            return {
                ...state,
                breadcrumbs: { title: action.title, links: action.links }
            }
        case SELECT_DONATION:
            return {
                ...state,
                selectedDonation: action.selected
            }
        default:
            return state
    }
}
