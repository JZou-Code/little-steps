import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import classes from '../../style/Header.module.css'
import AuthContext from "../../context/AuthContext.jsx";
import HeaderAccount from "./HeaderAccount.jsx";
import HeaderLogin from "./HeaderLogin.jsx";
import logo from '../../assets/logo/logo.png'

/**
 * Header component that displays the main navigation and logo
 * Shows different header content based on user authentication status
 * Contains navigation links to main pages and logo with home navigation
 * 
 * @returns {JSX.Element} The header component with navigation
 */
const Header = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const toHome = ()=>{
        navigate('/')
    }

    return (
        <div className={classes.Background}>
            <div className={classes.Container}>
                <div className={classes.TitleArea}>
                    <div onClick={toHome} className={classes.Title}>
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
