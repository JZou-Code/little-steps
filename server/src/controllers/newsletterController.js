/**
 * Newsletter controller that handles newsletter-related HTTP requests
 * Provides CRUD operations for newsletters with file upload support
 * All functions require authentication middleware
 */

const newsletterService = require('../services/newsletterService');

/**
 * Creates a new newsletter with images
 * @param {Object} req - Express request object with files
 * @param {Object} res - Express response object
 */
const createNewsletter = async (req, res) => {
    const files = req.files;
    const data = req.body;
    const result = await newsletterService.createNewsletter(data, files)
    res.send(result)
}

const updateNewsletter = async (req, res) => {
    const {id, ...data} = req.body;
    const result = await newsletterService.updateNewsletter(id, data)
    res.send(result)
}

const findNewsletter = async (req, res) => {
    const {id} = req.query;
    const result = await newsletterService.findNewsletter(id)
    res.send(result)
}

const findManyNewsletters = async (req, res) => {
    const filter = {...req.query};
    const result = await newsletterService.findManyNewsletters(filter)
    res.send(result)
}

const findManyNewslettersByOffset = async (req, res) => {
    const filter = req.body;
    const result = await newsletterService.findManyNewslettersByOffset(filter)
    res.send(result)
}

const deleteNewsletter = async (req, res) => {
    const {id} = req.query;
    const result = await newsletterService.deleteNewsletter(id)
    res.send(result)
}

module.exports = {
    createNewsletter,
    updateNewsletter,
    findNewsletter,
    findManyNewsletters,
    findManyNewslettersByOffset,
    deleteNewsletter
}
