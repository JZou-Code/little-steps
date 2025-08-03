import React from "react";
import {pageState} from "../utils/pageState.js";

const HeaderContext = React.createContext({
    state:pageState.NONE,
    dispatch:()=>{}
});

export default HeaderContext;