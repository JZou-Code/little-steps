import React, {useContext} from 'react';
import classes from "../style/Header.module.css";
import AuthContext from "../context/AuthContext.jsx";

const HeaderAccount = () => {
    const ctx = useContext(AuthContext);

    const onLogOut = () => {
        try {

        } catch (e) {

        } finally {
            ctx.setIsLogin(false);
        }
    }
    return (
        <div>
            <div className={classes.AccountContainer}>
                <div
                    onClick={onLogOut}
                    className={classes.Button}>
                    Log Out
                </div>
            </div>
        </div>
    );
};

export default HeaderAccount;
