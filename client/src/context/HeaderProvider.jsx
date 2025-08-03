import React, {useReducer} from 'react';
import HeaderContext from './HeaderContext';
import {pageState} from "../utils/pageState.js";

export default function HeaderProvider({children}) {
    const [popupStatus, dispatchPopupStatus] = useReducer(
        (prevState, action) => {
            switch (action.type){
                case pageState.NONE:
                    return pageState.NONE;
                case pageState.LOGIN:
                    return pageState.LOGIN;
                case pageState.SIGNUP:
                    return pageState.SIGNUP;
                case pageState.LOADING:
                    return pageState.LOADING;
                case pageState.PROCESSING:
                    return pageState.PROCESSING;
                case pageState.FAIL:
                    return pageState.FAIL;
                case pageState.FORGET:
                    return pageState.FORGET;
                case pageState.CONFIRM:
                    return pageState.CONFIRM;
                default:
                    return prevState
            }
        },
        pageState.NONE)
    return (
        <HeaderContext.Provider
            value={{
                state:popupStatus,
                dispatch:dispatchPopupStatus
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
}
