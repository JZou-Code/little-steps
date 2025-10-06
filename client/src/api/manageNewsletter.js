import axiosApi from "./axiosApi.js";

/**
 * API functions for newsletter operations
 * Handles newsletter creation and fetching
 */

/**
 * Creates a new newsletter with images
 * @param {FormData} data - Newsletter data including images
 * @returns {Promise} API response for newsletter creation
 */
export const createNewsletter = (data) => {
    return axiosApi.post(
        `/newsletter/create-newsletter/`,
        data
    )
}

/**
 * Fetches newsletters with pagination
 * @param {number} skip - Number of newsletters to skip
 * @param {number} take - Number of newsletters to take
 * @param {Object} orderBy - Sorting configuration
 * @returns {Promise} API response with newsletters data
 */
export const fetchNewsletters = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/newsletter/find-many-newsletters-by-offset',
        {skip, take, orderBy}
    )
}
