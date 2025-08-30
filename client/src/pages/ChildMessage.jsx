import React, {useCallback, useEffect, useState} from 'react';
import classes from '../style/ChildMessage.module.css'
import ChildrenList from "../components/ChildrenList.jsx";
import {forms} from "../utils/forms.js";
import UsersList from "../components/UsersList.jsx";
import BindChildToParent from "../components/BindChildToParent.jsx";
import {fetchChildren, fetchUsers} from "../api/adminOperation.js";
import {deleteUserById} from "../api/manageUsers.js";
import {deleteChildById} from "../api/manageChildren.js";

const ChildMessage = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [isLoading, setIsLoading] = useState(false);
    const [children, setChildren] = useState([]);

    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    const loadChildren = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetchChildren(pageIndex, itemNum, orderBy);
            const arr = res.data?.data ?? [];
            if (arr) {
                arr.map(item => {
                    item.dob = item.dob.split('T')[0];
                })
            }
            setChildren(arr.slice(0, itemNum));

            setDisablePrev(pageIndex === 0);
            setDisableNext(arr.length <= itemNum);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [pageIndex, itemNum, orderBy]);

    useEffect(() => {
        loadChildren();
    }, [loadChildren]);

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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Parent</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                children && children.map((item, index) =>
                                    <tr key={item.id}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.parent}</td>
                                        <td className={`${classes.CellButtonContainer}`}>
                                            <button datasrc={index}
                                                    onClick={() => {
                                                        props.setChild(item)
                                                    }}
                                                    className={classes.Button}>
                                                Message
                                            </button>
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

        </div>
    );
};

export default ChildMessage;
