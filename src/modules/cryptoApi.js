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
    return (dispatch) => {
        dispatch({
            type: FETCHING,
            payload: axios.get('https://min-api.cryptocompare.com/data/all/coinlist').then(res => {
                const arr = Object.keys(res.data.Data);
                const ret = arr.map((d, i) => {
                    return res.data.Data[d]
                }, this)
                const f = ret.slice(0, 50)
                dispatch({
                    type: CURRENCY_FOUND,
                    payload: { BaseImageUrl: res.data.BaseImageUrl, Data: f }
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

//https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR
//https://www.cryptocompare.com/api/data/coinlist/
//https://min-api.cryptocompare.com/data/all/coinlist