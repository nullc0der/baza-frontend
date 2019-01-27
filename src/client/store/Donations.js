const createAction = str => `DONATIONS_${str}`

const INITIAL_STATE = {
    list: [{ code: '099', iso: 'ATA', totalReceipients: 200, totalDonors: 345 }]
}

const RECEIVED_DONATION_DATA_ON_WS = createAction(
    'RECEIVED_DONATION_DATA_ON_WS'
)
const receivedDonationDataOnWS = data => ({
    type: RECEIVED_DONATION_DATA_ON_WS,
    data
})

export const actions = {
    receivedDonationDataOnWS
}

export default function DonationsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RECEIVED_DONATION_DATA_ON_WS:
            return { ...state, list: [...state.list, action.data] }
        default:
            return state
    }
}
