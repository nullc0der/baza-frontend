

const INITIAL_STATE = {
    isLoading: true
}


const createAction = str => `RUNTIME_${str}`        //eslint-disable-line no-unused-vars



export const actions = {

}


export default function RuntimeReducer(state = INITIAL_STATE, action){
    switch(action.type){
        default:
            return state
    }
}
