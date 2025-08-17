import {useContext, useEffect} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import PageStateContext from "../context/PageStateContext.jsx";
import {pageState} from "./pageState.js";
import {roles} from "./roles.js";

export default function AdminRoute() {
    const {isLogin, user:{role}} = useContext(AuthContext);
    const {dispatch} = useContext(PageStateContext)
    const location = useLocation();

    useEffect(() => {
        if (!isLogin) {
            dispatch({type: pageState.LOGIN});
        }
    }, [isLogin, dispatch]);

    if (!isLogin) {
        return <Navigate to="/account/login" state={{from: location}} replace/>;
    }

    if (role !== roles.ADMIN) {
        return <Navigate to="/account" state={{from: location}} replace/>;
    }

    return <Outlet/>;
}
