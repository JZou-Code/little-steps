import React, {useEffect, useState} from 'react';
import classes from '../style/AdminDashboardPage.module.css'
import {fetchUsers} from "../api/adminOperation.js";
import LoginForm from "../components/LoginForm.jsx";
import Backdrop from "../UI/Backdrop/Backdrop.jsx";
import ModifyUsers from "../components/ModifyUsers.jsx";
import {roles} from "../utils/roles.js";

const AdminDashboardPage = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const res = await fetchUsers(pageIndex, itemNum, orderBy);

                if (res.data.data.length <= itemNum) {
                    setDisableNext(true);
                }

                setUsers(res.data.data.slice(0, itemNum))
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [pageIndex, itemNum, orderBy]);

    const handlePrev = () => {
        setDisableNext(false);
        if (pageIndex < itemNum) {
            return
        }
        setPageIndex(pageIndex - itemNum);

        if (pageIndex <= itemNum) {
            setDisablePrev(true);
        }
    }

    const handleNext = () => {
        setDisablePrev(false);
        setPageIndex(pageIndex + itemNum)
    }

    const modifyHandler = (item) => {
        setData(item);
        setIsEditing(true);
    }

    const deleteHandler = () => {
    }

    const cancelHandler = ()=>{
        setIsEditing(false);
    }

    return (
        <div className={classes.Container}>
            <div className={classes.ListContainer}>
                {
                    isLoading ?
                        <div>Loading...</div>
                        :
                        <table>
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Operation</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users && users.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.role}</td>
                                        <td className={`${classes.CellButtonContainer}`}>
                                            <button datasrc={index}
                                                    onClick={() => {
                                                        modifyHandler(item)
                                                    }}
                                                    className={classes.Button}>
                                                Modify
                                            </button>
                                            <button onClick={deleteHandler} className={classes.Button}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                }
                <div className={classes.ListFunction}>
                    <button
                        onClick={handlePrev}
                        className={disablePrev ? `${classes.Button} ${classes.Disabled}` : classes.Button}>
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className={disableNext ? `${classes.Button} ${classes.Disabled}` : classes.Button}>
                        Next
                    </button>
                </div>
            </div>
            {
                isEditing &&
                <Backdrop>
                    <ModifyUsers onCancel={cancelHandler} data={data}/>
                </Backdrop>
            }

        </div>
    );
};

export default AdminDashboardPage;
