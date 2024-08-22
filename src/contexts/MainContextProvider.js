import React, { createContext, useContext, useReducer } from 'react';

import axios from 'axios'

const APIID = 'https://cargokbbelovodsk1.kg/api/v1/main/'

export const mainContext = createContext();

export const useMain = () => {
    return useContext(mainContext);
};

const INIT_STATE = {
    kgAdresses: [],
    cnAdresses: [],
    recents: [],
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case 'GET_KGADRESSES':
        return { ...state, kgAdresses: action.payload }
      case 'GET_CNADRESSES':
        return { ...state, cnAdresses: action.payload }
      case 'GET_RECENTS':
        return {...state, recents: action.payload}
      default:
        return state
    }
}
  
const MainContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getKgAdresses = async () => {
        const { data } = await axios(`${APIID}`)
        dispatch({
          type: 'GET_KGADRESSES',
          payload: data.kyrgyzstan_addresses
        })
    }

    const getCnAdresses = async () => {
        const { data } = await axios(`${APIID}`)
        dispatch({
          type: 'GET_CNADRESSES',
          payload: data.china_addresses
        })
    }

    const getRecents = async () => {
        const { data } = await axios(`${APIID}`)
        dispatch({
          type: 'GET_RECENTS',
          payload: data.recent_orders
        })
    }

    return <mainContext.Provider value={{
        kgAdresses: state.kgAdresses,
        cnAdresses: state.cnAdresses,
        recents: state.recents,
        getCnAdresses,
        getKgAdresses,
        getRecents
      }}
      >{children}</mainContext.Provider>
 };

 export default MainContextProvider;