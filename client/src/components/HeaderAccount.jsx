import React, {useContext} from 'react';
import classes from "../style/Header.module.css";
import AuthContext from "../context/AuthContext.jsx";
import useAuth from "../hook/useAuth.jsx";

const HeaderAccount = () => {
    const ctx = useContext(AuthContext);
    const {logout} = useAuth();

    const onLogOut = () => {
        try {
            logout(ctx.user.id);
        } catch (e) {

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
