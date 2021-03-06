import axios from 'axios'
export const CURRENCY_FOUND = 'crypto/CURRENCY_FOUND'
export const FETCHING = 'crypto/FETCHING'
export const SELECT_COIN = 'crypto/SELECT_COIN'
export const MULTI_FOUND = 'crypto/MULTI_FOUND'
export const FETCHING_PRICE = 'crypto/FETCHING_PRICE'
export const PRICE_FOUND = 'crypto/PRICE_FOUND'
export const PRICE_BY_TIME_FOUND = 'crypto/PRICE_BY_TIME_FOUND'
export const NEWS_FOUND = 'crypto/NEWS_FOUND'


const initialState = {
    fetching: false,
    results: null,
    selectedCoin: null,
    multiResults: null,
    price: null,
    news: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_FOUND:
            return {
                ...state,
                results: action.payload
            }
        case MULTI_FOUND:
            return {
                ...state,
                fetching: false,
                multiResults: action.payload
            }
        case FETCHING:
            return {
                ...state,
                fetching: true,
                multiResults: false
            }
        case SELECT_COIN:
            return {
                ...state,
                selectedCoin: action.payload
            }
        case FETCHING_PRICE:
            return {
                ...state,
                fetching: true,
                //price: null
            }
        case PRICE_FOUND:
            return {
                ...state,
                fetching: false,
                price: action.payload
            }

        case NEWS_FOUND:
            return {
                ...state,
                fetching: false,
                news: action.payload
            }

        case PRICE_BY_TIME_FOUND:
            return {
                ...state,
                fetching: false,
                price: action.payload

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
                /**
                 * slice the Data results as it is too big
                 */
                const arr = Object.keys(res.data.Data);
                const ret = arr.map((d, i) => {
                    return res.data.Data[d]
                }, this)

                const f = ret.slice(0, 50)
                f.sort((a, b) => {
                    return a.SortOrder - b.SortOrder
                })
                dispatch({
                    type: CURRENCY_FOUND,
                    payload: { BaseImageUrl: res.data.BaseImageUrl, Data: f }
                })
            })
        })
    }
}

export const searchMulti = (list, type = 'histoday') => {

    return (dispatch) => {
        const requests = list.map(e => {
            return axios.get((`https://min-api.cryptocompare.com/data/${type}?fsym=${e}&tsym=USD&limit=60&aggregate=3&e=CCCAGG`))
        })
        dispatch({
            type: FETCHING,
            payload: axios.all(requests).then(res => {
                const results = res.map((e, i) => {
                    let d = list[i]
                    e.data['COIN'] = d;
                    return e.data
                })
                dispatch({
                    type: MULTI_FOUND,
                    payload: results
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
/**
 * 
 * @param {*Array} symbolList - list of Symbol IDS e.g  [['BTC', '1182'], ['ETH', '7605']]
 */
export const getPrice = (symbolList = [['BTC', '1182'], ['ETH', '7605']], time = new Date().getTime()) => {
    return (dispatch) => {
        const requests = symbolList.map(e => {
            return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${e[0]}&tsyms=BTC,USD,EUR&ts=${time}`);
        })
        dispatch({
            type: FETCHING_PRICE,
            payload: axios.all(requests).then(res => {
                dispatch({
                    type: PRICE_FOUND,
                    payload: res.reduce((acc, val) => acc.concat(val.data), [])
                })
            })
        })

    }
}
export const getPriceAtTime = (symbolList = ['BTC', 'ETH'], timeList) => {
    return (dispatch) => {
        const requests = timeList.map(time => {
            return symbolList.map(e => {
                return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${e}&tsyms=BTC,USD,EUR&ts=${time}`);
            })
        });
        console.log(requests)
        dispatch({
            type: FETCHING_PRICE,
            payload: axios.all(requests.map(d => axios.all(d))).then(res => {
                const formated = res.reduce((acc, val) => {
                    let _d = val.map(d => d.data)
                    return acc.concat([_d])
                }, [])
                dispatch({
                    type: PRICE_FOUND,
                    payload: formated
                })
            })
        })

    }
}

export const getNews = () => {
    return (dispatch) => {
        dispatch({
            type: FETCHING,
            payload: axios.get(`https://min-api.cryptocompare.com/data/news/`).then(res => {
                dispatch({
                    type: NEWS_FOUND,
                    payload: res.data
                })
            })
        })
    }
}



/**
 ***************** example multi grouped request *******************
 */
// const requests = symbolList.map(e => {
//     const price = axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${e[0]}&tsyms=BTC,USD,EUR`);
//     const snapshot = axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${e[0]}&tsyms=BTC,USD,EUR`);
//     //const snapshot = axios.get(`https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${e[1]}`);
//     return [price, snapshot]
// })
// dispatch({
//     type: FETCHING_PRICE,
//     payload: axios.all(requests.map(d => { return axios.all(d) })).then(res => {
//         dispatch({
//             type: PRICE_FOUND,
//             payload: res.reduce((acc, val) => {
//                 return acc.concat(val.data)
//             }, [])
//         })
//     })
// })



//https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR
//https://www.cryptocompare.com/api/data/coinlist/
//https://min-api.cryptocompare.com/data/all/coinlist