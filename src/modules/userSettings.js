
export const CURRENCY_ADDED = 'usersettings/CURRENCY_ADDED'
export const CURRENCY_REMOVED = 'usersettings/CURRENCY_REMOVED'


const initialState = {
    list: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_ADDED:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case CURRENCY_REMOVED:
            return {
                ...state,
                list: state.list.filter(d => d.Id !== action.payload)
            }

        default:
            return state
    }
}

export const add = (currencie) => {
    return dispatch => {
        dispatch({
            type: CURRENCY_ADDED,
            payload: currencie
        })

    }
}

export const remove = (currencie) => {
    return dispatch => {
        dispatch({
            type: CURRENCY_REMOVED,
            payload: currencie.Id
        })
    }
}

