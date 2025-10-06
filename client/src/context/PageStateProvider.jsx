import React, {useReducer} from 'react';
import {pageState} from "../utils/pageState.js";
import PageStateContext from "./PageStateContext.jsx";

/**
 * PageStateProvider component that manages page state transitions
 * Uses useReducer to handle state changes for different UI modes
 * Provides page state context to child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The page state provider component
 */
export default function PageStateProvider({children}) {
    /**
     * Reducer function for managing page state transitions
     * Handles different page states including login, signup, loading, etc.
     */
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
        <PageStateContext.Provider
            value={{
                state:popupStatus,
                dispatch:dispatchPopupStatus
            }}
        >
            {children}
        </PageStateContext.Provider>
    );
}
