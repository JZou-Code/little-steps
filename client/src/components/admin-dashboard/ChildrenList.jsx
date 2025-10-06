import React, {useCallback, useEffect, useState} from 'react';
import classes from '../../style/AdminDashboardPage.module.css'
import {fetchChildren} from "../../api/adminOperation.js";
import Backdrop from "../../UI/Backdrop/Backdrop.jsx";
import Confirm from "../common/Confirm.jsx";
import Message from "../common/Message.jsx";
import ModifyChildren from "./ModifyChildren.jsx";
import {deleteChildById} from "../../api/manageChildren.js";

/**
 * ChildrenList component that displays and manages child records
 * Shows paginated list of children with modify and delete operations
 * Handles child editing, deletion, and parent binding functionality
 * Includes date formatting and success/error notifications
 * 
 * @param {Object} props - Component props
 * @param {Function} props.setChild - Function to set selected child data
 * @param {Function} props.bindChild - Function to trigger child binding
 * @returns {JSX.Element} The children list component
 */
const AdminDashboardPage = (props) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [isLoading, setIsLoading] = useState(false);
    const [children, setChildren] = useState([]);

    const [data, setData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [id, setId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [successfulMsg, setSuccessfulMsg] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [failedMsg, setFailedMsg] = useState('');
    const [isFailed, setIsFailed] = useState(false);

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

    const modifyHandler = (item) => {
        setData(item);
        setIsEditing(true);
    }

    const deleteHandler = (id) => {
        setId(id);
        setIsDeleting(true);
    }

    const cancelEditHandler = () => {
        setIsEditing(false);
        setData(null);
    }

    const cancelDeleteHandler = () => {
        setIsDeleting(false);
        setId(null);
    }

    const confirmDeleteHandler = async () => {
        try {
            const res = await deleteChildById(id);
            setupMsg('Delete Successfully', true);
            console.log(res)
            if (children.length === 1 && pageIndex > 0) {
                setPageIndex(pageIndex - itemNum);
            } else {
                await loadChildren();
            }
        } catch (e) {
            setupMsg('Delete Failed', false)
            console.log(e)
        } finally {
            setIsDeleting(false);
        }
    }

    const cancelMessage = () => {
        setIsFailed(false);
        setIsSuccessful(false);
    }

    const setupMsg = (msg, flag) => {
        if (flag) {
            setSuccessfulMsg(msg);
            setIsSuccessful(true);
        } else {
            setFailedMsg(msg);
            setIsFailed(true);
        }
    }

    const handleBind = ()=>{
        props.bindChild();
    }

    return (
        <>
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
                                <th>Operation</th>
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
                                                        modifyHandler(item);
                                                        props.setChild(item)
                                                    }}
                                                    className={classes.Button}>
                                                Modify
                                            </button>
                                            <button onClick={() => {
                                                deleteHandler(item.id)
                                            }} className={classes.Button}>Delete
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

            {
                isEditing &&
                <Backdrop>
                    <ModifyChildren onCancel={cancelEditHandler}
                                    setupMsg={setupMsg}
                                    bindChild={handleBind}
                                    loadChildren={loadChildren}
                                    data={data}/>
                </Backdrop>
            }

            {
                isDeleting &&
                <Backdrop>
                    <Confirm onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler}/>
                </Backdrop>
            }

            {
                isSuccessful &&
                <Backdrop>
                    <Message onCancel={cancelMessage} message={successfulMsg} flag={true}/>
                </Backdrop>
            }
            {
                isFailed &&
                <Backdrop>
                    <Message onCancel={cancelMessage} message={failedMsg} flag={false}/>
                </Backdrop>
            }
        </>
    )
        ;
};

export default AdminDashboardPage;
