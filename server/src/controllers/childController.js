/**
 * Child controller that handles child-related HTTP requests
 * Provides CRUD operations for child entities
 * All functions require authentication middleware
 */

const childService = require('../services/childService');

/**
 * Creates a new child record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createChild = async (req, res) => {
    const data = req.body;
    const result = await childService.createChild(data)
    res.send(result)
}

/**
 * Updates an existing child record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateChild = async (req, res) => {
    const {id, ...data} = req.body;
    const result = await childService.updateChild(id, data)
    res.send(result)
}

/**
 * Finds a single child by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const findChild = async (req, res) => {
    const {id} = req.query;
    const result = await childService.findChild(id)
    res.send(result)
}

const findManyChildren = async (req, res) => {
    const filter = {...req.query};
    const result = await childService.findManyChildren(filter)
    res.send(result)
}

const findManyChildrenByOffset = async (req, res) => {
    const filter = req.body;
    const result = await childService.findManyChildrenByOffset(filter)
    res.send(result)
}

const deleteChild = async (req, res) => {
    const {id} = req.query;
    const result = await childService.deleteChild(id)
    res.send(result)
}

module.exports = {
    createChild,
    updateChild,
    findChild,
    findManyChildren,
    findManyChildrenByOffset,
    deleteChild
}
