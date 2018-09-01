// eslint-disable-next-line no-unused-vars
const debug = require('debug')('baza:store:common')

const INITIAL_STATE = {
    breadcrumbs: {
        title: 'Home',
        links: [{ href: '/', text: 'Home' }]
    },
    selectedDonation: {},
    subHeaderSearchString: '',
    subHeaderFilters: []
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

const CHANGE_SUBHEADER_SEARCHSTRING = 'CHANGE_SUBHEADER_SEARCHSTRING'
const changeSubHeaderSearchString = (searchString) => ({
    type: CHANGE_SUBHEADER_SEARCHSTRING,
    searchString
})

const CHANGE_SUBHEADER_FILTERS = 'CHANGE_SUBHEADER_FILTERS'
const changeSubHeaderFilters = (filters) => ({
    type: CHANGE_SUBHEADER_FILTERS,
    filters
})

export const actions = {
    setBreadCrumbs,
    selectDonation,
    changeSubHeaderFilters,
    changeSubHeaderSearchString
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
        case CHANGE_SUBHEADER_SEARCHSTRING:
            return { ...state, subHeaderSearchString: action.searchString }
        case CHANGE_SUBHEADER_FILTERS:
            return { ...state, subHeaderFilters: action.filters }
        default:
            return state
    }
}
