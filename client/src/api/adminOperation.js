import {roles} from "../utils/roles.js";
import axiosApi from "./axiosApi.js";

export const fetchUsers = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/user/find-many-users-by-offset',
        {skip, take, orderBy}
    )
}

export const fetchChildren = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/child/find-many-children-by-offset',
        {skip, take, orderBy}
    )
}

export const searchUsers = (skip, take, orderBy = {}, keyword) => {
    const query = keyword ? {contains: keyword} : undefined
    return axiosApi.post(
        '/user/find-many-users-by-offset',
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
    return axiosApi.post(
        '/child/find-many-children-by-offset',
        {
            skip, take, orderBy,
            where: queryObj
        }
    )
}
