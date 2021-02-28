import {createContext, useReducer, useEffect} from "react"
import {GlobalReducer} from "./GlobalReducer";

const initialState = {
    allConvers: {},
    currConver: {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ( { children } ) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState);

    function setAllConver(obj) {
        dispatch({
            type: 'SET_ALL_CONVERS',
            payload: obj
        });
    }
    return (
        <GlobalContext.Provider
            value={{allConvers: state.allConvers, currConver: state.currConver, setAllConver}}>
            {children}
        </GlobalContext.Provider>
    );
}
