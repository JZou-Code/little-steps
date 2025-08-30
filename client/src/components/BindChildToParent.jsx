import React, {use, useCallback, useEffect, useState} from 'react';
import classes from '../style/AdminDashboardPage.module.css'
import {searchUsers} from "../api/adminOperation.js";
import {deleteUserById} from "../api/manageUsers.js";
import {updateChildById} from "../api/manageChildren.js";

const BindChildToParent = ({child, reset}) => {
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

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

    const [keyword, setKeyword] = useState('');
    const [query, setQuery] = useState('');
    const [boundParentId, setBoundParentId] = useState(child.parentId || '');

    const searchResults = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await searchUsers(pageIndex, itemNum, orderBy, query);
            console.log(res)
            const arr = res.data?.data ?? [];

            setUsers(arr.slice(0, itemNum));

            setDisablePrev(pageIndex === 0);
            setDisableNext(arr.length <= itemNum);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [pageIndex, itemNum, orderBy, query]);

    useEffect(() => {
        searchResults();
        setBoundParentId(child.parentId);
    }, [searchResults]);

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
            const res = await deleteUserById(id);
            setupMsg('Delete Successfully', true);
            console.log(res)
            if (users.length === 1 && pageIndex > 0) {
                setPageIndex(pageIndex - itemNum);
            } else {
                await loadUsers();
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

    const handleSearch = async () => {
        setPageIndex(0);
        setQuery(keyword.trim());
        await searchResults();
    }

    const handleBind = async (parentIdParam)=>{
        await updateChildById(child.id, {parentId: parentIdParam})
        setBoundParentId(parentIdParam)
    }

    return (
        <div className={classes.ListContainer}>
            <div className={classes.Title}>
                Child Name: {child.firstName + ' ' + child.lastName}
            </div>
            <div className={classes.SearchBarContainer}>
                <input
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                    }}
                    placeholder={'Parent Name'}
                    className={classes.SearchBar}/>
                <button onClick={handleSearch} className={classes.Button}>
                    Search
                </button>
            </div>
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
                                users && users.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.role}</td>
                                        <td>
                                            <button
                                                onClick={()=>{handleBind(item.id)}}
                                                className={`${classes.Button} ${(boundParentId === item.id) && classes.Disabled}`}>
                                                Bind
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

export default BindChildToParent;
