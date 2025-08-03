import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import classes from '../style/Header.module.css'
import Backdrop from "../UI/Backdrop/Backdrop.jsx";
// import TopCorner from "./TopCorner.jsx";
import HeaderContext from "../context/HeaderContext.jsx";
import {pageState} from "../utils/pageState.js";


const Header = () => {
    const onClose = () => {
        ctx.dispatch({type: pageState.NONE})
    }

    const ctx = useContext(HeaderContext);

    return (
        <>
            <div className={classes.Container}>
                <div className={classes.TitleArea}>

                    <div>
                        <div className={classes.Title}>Little Steps</div>
                    </div>
                    <div className={classes.LoginContainer}>
                        <div className={`${classes.Button} ${classes.Login}`}
                             onClick={() => {
                                 ctx.dispatch({type: pageState.LOGIN})
                             }}>Log In
                        </div>
                        <div className={`${classes.Button} ${classes.SignUp}`}
                             onClick={() => {
                                 ctx.dispatch({type: pageState.SIGNUP})
                             }}>Sign Up
                        </div>
                    </div>
                </div>

                <div className={classes.LinkContainer}>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/' end>
                        Home
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/about' end>
                        About
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/gallery' end>
                        Gallery
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/contact' end>
                        Contact
                    </NavLink>
                </div>

            </div>
            {
                ctx.state === pageState.NONE ?
                    '' :
                    <Backdrop>
                        <TopCorner status={ctx.state} onClose={onClose}></TopCorner>
                    </Backdrop>
            }

        </>
    );
};

export default Header;