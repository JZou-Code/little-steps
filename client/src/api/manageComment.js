import axiosApi from "./axiosApi.js";

/**
 * API functions for comment operations
 * Handles comment creation and fetching
 */

/**
 * Creates a new comment
 * @param {Object} data - Comment data to create
 * @returns {Promise} API response for comment creation
 */
export const createComment = (data) => {
    return axiosApi.post(
        `/comment/create-comment/`,
        data
    )
}

/**
 * Fetches comments with pagination and filtering
 * @param {number} skip - Number of comments to skip
 * @param {number} take - Number of comments to take
 * @param {Object} orderBy - Sorting configuration
 * @param {string} id - Newsletter ID to filter comments
 * @returns {Promise} API response with comments data
 */
export const fetchComments = (skip, take, orderBy = {}, id) => {
    return axiosApi.post(
        '/comment/find-many-comments-by-offset',
        {skip, take, orderBy, id}
    )
}
