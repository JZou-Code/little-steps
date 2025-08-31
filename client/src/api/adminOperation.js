import axios from "axios";
import {roles} from "../utils/roles.js";

export const fetchUsers = (skip, take, orderBy = {}) => {
    return axios.post(
        'http://localhost:3000/user/find-many-users-by-offset',
        {skip, take, orderBy}
    )
}

export const fetchChildren = (skip, take, orderBy = {}) => {
    return axios.post(
        'http://localhost:3000/child/find-many-children-by-offset',
        {skip, take, orderBy}
    )
}

export const searchUsers = (skip, take, orderBy = {}, keyword) => {
    const query = keyword ? {contains: keyword} : undefined

    return axios.post(
        'http://localhost:3000/user/find-many-users-by-offset',
        {
            skip, take, orderBy,
            where: {
                role: roles.PARENT,
                firstName: query
            }
        }
    )
}

export const searchChildren = (skip, take, orderBy = {}, keyword, user) => {
    const queryObj = {
        firstName: keyword ? {contains: keyword} : undefined
    }

    if(user.role === roles.PARENT){
        queryObj.parentId = user.id
    }

    return axios.post(
        'http://localhost:3000/child/find-many-children-by-offset',
        {
            skip, take, orderBy,
            where: queryObj
        }
    )
}
