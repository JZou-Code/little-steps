/**
 * Child service that handles child-related business logic
 * Provides CRUD operations for child entities
 * Acts as a bridge between controllers and data access layer
 */

const childDao = require('../DAO/childDAO');

/**
 * Creates a new child record
 * @param {Object} data - Child data to create
 * @returns {Promise} Result from child DAO
 */
const createChild = async (data) => {
    return childDao.createChild(data)
}

const updateChild = async (id, data) => {
    return childDao.updateChild(id, data);
}

const findChild = (id) => {
    return childDao.findChild(id);
}

const findManyChildren = (filterObj) => {
    return childDao.findManyChildren(filterObj);
}

const findManyChildrenByOffset = (filterObj) => {
    return childDao.findManyChildrenByOffset(filterObj);
}

const deleteChild = (id) => {
    return childDao.deleteChild(id);
}

module.exports = {
    createChild,
    updateChild,
    findChild,
    findManyChildren,
    findManyChildrenByOffset,
    deleteChild
}
