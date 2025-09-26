import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import classes from '../style/Header.module.css'
import AuthContext from "../context/AuthContext.jsx";
import HeaderAccount from "./HeaderAccount.jsx";
import HeaderLogin from "./HeaderLogin.jsx";
import logo from '../assets/logo/logo.jpg'


const Header = () => {
    const ctx = useContext(AuthContext);

    return (
        <div className={classes.Background}>
            <div className={classes.Container}>
                <div className={classes.TitleArea}>
                    <div className={classes.Title}>
                        {/*Little Steps*/}
                        <img className={classes.Logo} src={logo} alt={'logo'}/>
                    </div>
                    {ctx.isLogin ? <HeaderAccount/> : <HeaderLogin/>}
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
                        to='/gallery' end>
                        Gallery
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/contact' end>
                        Contact
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/newsletter' end>
                        Newsletter
                    </NavLink>
                    <NavLink
                        className={({isActive}) => isActive ?
                            `${classes.Active} ${classes.Link}` : classes.Link}
                        to='/account' end>
                        Account
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default Header;
