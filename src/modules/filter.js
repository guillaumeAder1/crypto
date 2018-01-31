export const FILTER = 'filter/FILTER'



const initialState = {
    data: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FILTER:
            return {
                ...state,
                results: action.payload
            }


        default:
            return state
    }
}


export const filter = (data) => {
    return dispatch => {
        dispatch({
            type: FILTER,
            payload: data
        })

    }
}
