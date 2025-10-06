/**
 * Image controller that handles image-related HTTP requests
 * Provides CRUD operations for article images
 * All functions require authentication middleware
 */

const imageService = require('../services/imageService');

/**
 * Creates a new image record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createImage = async (req, res) => {
    const data = req.body;
    const result = await imageService.createImage(data)
    res.send(result)
}

const updateImage = async (req, res) => {
    const {id, ...data} = req.body;
    const result = await imageService.updateImage(id, data)
    res.send(result)
}

const findImage = async (req, res) => {
    const {id} = req.query;
    const result = await imageService.findImage(id)
    res.send(result)
}

const findManyImages = async (req, res) => {
    const filter = {...req.query};
    const result = await imageService.findManyImages(filter)
    res.send(result)
}

const findManyImagesByOffset = async (req, res) => {
    const filter = req.body;
    const result = await imageService.findManyImagesByOffset(filter)
    res.send(result)
}

const deleteImage = async (req, res) => {
    const {id} = req.query;
    const result = await imageService.deleteImage(id)
    res.send(result)
}

module.exports = {
    createImage,
    updateImage,
    findImage,
    findManyImages,
    findManyImagesByOffset,
    deleteImage
}
