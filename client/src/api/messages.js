import axiosApi from "./axiosApi.js";

/**
 * API functions for message operations
 * Handles fetching and creating messages
 */

/**
 * Fetches messages with pagination and filtering
 * @param {number} skip - Number of messages to skip
 * @param {number} take - Number of messages to take
 * @param {Object} orderBy - Sorting configuration
 * @param {string} id - Child ID to filter messages
 * @returns {Promise} API response with messages data
 */
export const fetchMessages = (skip, take, orderBy = {}, id) => {
    return axiosApi.post(
        `/message/find-many-messages-by-offset`,
        {skip, take, orderBy, where:{childId:id}}
    )
}

/**
 * Creates a new message
 * @param {Object} data - Message data to create
 * @returns {Promise} API response for message creation
 */
export const addMessage = (data) => {
    return axiosApi.post(
        `/message/create-message`,
        {...data}
    )
}
