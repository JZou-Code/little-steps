import {roles} from "../utils/roles.js";
import axiosApi from "./axiosApi.js";

/**
 * API functions for admin operations
 * Handles user and children management with search capabilities
 */

/**
 * Fetches users with pagination
 * @param {number} skip - Number of users to skip
 * @param {number} take - Number of users to take
 * @param {Object} orderBy - Sorting configuration
 * @returns {Promise} API response with users data
 */
export const fetchUsers = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/user/find-many-users-by-offset',
        {skip, take, orderBy}
    )
}

/**
 * Fetches children with pagination
 * @param {number} skip - Number of children to skip
 * @param {number} take - Number of children to take
 * @param {Object} orderBy - Sorting configuration
 * @returns {Promise} API response with children data
 */
export const fetchChildren = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/child/find-many-children-by-offset',
        {skip, take, orderBy}
    )
}

/**
 * Searches users by keyword with pagination
 * @param {number} skip - Number of users to skip
 * @param {number} take - Number of users to take
 * @param {Object} orderBy - Sorting configuration
 * @param {string} keyword - Search keyword for user names
 * @returns {Promise} API response with filtered users data
 */
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

/**
 * Searches children by keyword with pagination and role-based filtering
 * @param {number} skip - Number of children to skip
 * @param {number} take - Number of children to take
 * @param {Object} orderBy - Sorting configuration
 * @param {string} keyword - Search keyword for children names
 * @param {Object} user - Current user for role-based filtering
 * @returns {Promise} API response with filtered children data
 */
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
