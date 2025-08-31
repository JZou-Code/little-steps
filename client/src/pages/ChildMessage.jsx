import React, {useCallback, useContext, useEffect, useState} from 'react';
import classes from '../style/ChildMessage.module.css'
import {searchChildren} from "../api/adminOperation.js";
import AuthContext from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const ChildMessage = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [isLoading, setIsLoading] = useState(false);
    const [children, setChildren] = useState([]);

    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    const [keyword, setKeyword] = useState('');
    const [query, setQuery] = useState('');

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const searchResults = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await searchChildren(pageIndex, itemNum, orderBy, query, authCtx.user);


            const childrenArr = res.data?.data ?? [];
            const newChildrenArr = childrenArr.map(item => {
                return {
                    ...item,
                    dob: item.dob.split('T')[0]
                }
            })

            setChildren(newChildrenArr.slice(0, itemNum));

            setDisablePrev(pageIndex === 0);
            setDisableNext(childrenArr.length <= itemNum);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [pageIndex, itemNum, orderBy, query]);

    useEffect(() => {
        searchResults();
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

    const handleSearch = async () => {
        setPageIndex(0);
        setQuery(keyword.trim());
        await searchResults();
    }

    return (
        <div className={classes.Container}>
            <div className={classes.ListContainer}>
                <div className={classes.SearchBarContainer}>
                    <input
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                        }}
                        placeholder={'Child First Name'}
                        className={classes.SearchBar}/>
                    <button onClick={handleSearch} className={classes.Button}>
                        Search
                    </button>
                </div>
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
                                                        navigate('/child-message/message', {state: {id: item.id, name: item.lastName}})
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
