import axiosApi from "./axiosApi.js";

/**
 * API functions for child management operations
 * Handles child creation, updates, and deletion
 */

/**
 * Deletes a child by ID
 * @param {string} id - Child ID to delete
 * @returns {Promise} API response for child deletion
 */
export const deleteChildById = (id) => {
    return axiosApi.delete(
        `/child/delete-child/${id}`,
    )
}

/**
 * Updates child information by ID
 * @param {string} id - Child ID to update
 * @param {Object} data - Child data to update
 * @returns {Promise} API response for child update
 */
export const updateChildById = (id, data) => {
    return axiosApi.put(
        `/child/update-child`,
        {id, ...data}
    )
}

/**
 * Creates a new child record
 * @param {Object} data - Child data to create
 * @returns {Promise} API response for child creation
 */
export const addNewChild = (data) => {
    return axiosApi.post(
        '/child/create-child',
        data
    )
}
