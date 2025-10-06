import React from "react";
import {pageState} from "../utils/pageState.js";

/**
 * Page state context that manages UI state transitions
 * Provides state and dispatch function for controlling form displays
 * Used to switch between login, signup, and other UI states
 */
const PageStateContext = React.createContext({
    state:pageState.NONE,
    dispatch:()=>{}
});

export default PageStateContext;