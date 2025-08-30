import React, {useState} from 'react';
import classes from '../style/AdminDashboardPage.module.css'
import UsersList from "../components/UsersList.jsx";
import ChildrenList from "../components/ChildrenList.jsx";
import {forms} from "../utils/forms.js";
import BindChildToParent from "../components/BindChildToParent.jsx";
import {useNavigate} from "react-router-dom";

const AdminDashboardPage = () => {
    const [formState, setFormState] = useState(forms.USERS)
    const [child, setChild] = useState(null)
    const navigate = useNavigate();

    return (
        <div className={classes.Container}>
            <div className={classes.TopBar}>
                <button
                    onClick={() => {
                        setFormState(forms.USERS)
                    }}
                    className={classes.Button}>Users
                </button>
                <button
                    onClick={() => {
                        setFormState(forms.CHILDREN)
                    }}
                    className={classes.Button}>Children
                </button>
                <button
                    onClick={() => {
                        navigate('/account/add-child')
                    }}
                    className={classes.Button}>New Child
                </button>
            </div>
            {
                formState === forms.USERS && <UsersList/>
            }

            {
                formState === forms.CHILDREN && <ChildrenList
                    setChild={setChild}
                    bindChild={() => {
                        setFormState(forms.BIND)
                    }}/>
            }

            {
                formState === forms.BIND && <BindChildToParent child={child} reset={() => {
                    setChild(null)
                }}/>
            }
        </div>
    )
        ;
};

export default AdminDashboardPage;
