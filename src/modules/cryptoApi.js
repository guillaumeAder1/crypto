import axios from 'axios'
export const CURRENCY_FOUND = 'crypto/CURRENCY_FOUND'
export const FETCHING = 'crypto/FETCHING'
export const SELECT_COIN = 'crypto/SELECT_COIN'


const initialState = {
    fetching: false,
    results: null,
    selectedCoin: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_FOUND:
            return {
                ...state,
                results: action.payload
            }

        case FETCHING:
            return {
                ...state,
                fetching: true
            }
        case SELECT_COIN:
            return {
                ...state,
                selectedCoin: action.payload
            }

        default:
            return state
    }
}

export const search = () => {
    //https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR
    //https://www.cryptocompare.com/api/data/coinlist/
    //https://min-api.cryptocompare.com/data/all/coinlist
    return (dispatch) => {
        dispatch({
            type: FETCHING,
            payload: axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then(res => {
                dispatch({
                    type: CURRENCY_FOUND,
                    payload: res.data
                })
            })
        })
    }
}

export const select = (symbol) => {
    return (dispatch) => {
        dispatch({
            type: FETCHING,
            payload: axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`).then(res => {
                dispatch({
                    type: SELECT_COIN,
                    payload: res.data
                })
            })
        })
    }
}