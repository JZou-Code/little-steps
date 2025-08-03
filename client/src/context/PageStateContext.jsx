import React from "react";
import {pageState} from "../utils/pageState.js";

const PageStateContext = React.createContext({
    state:pageState.NONE,
    dispatch:()=>{}
});

export default PageStateContext;