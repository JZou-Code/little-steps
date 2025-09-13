const imageDao = require('../DAO/imageDAO');

const createImage = async (file, index, id) => {
    return imageDao.createImage(file, index, id)
}

const updateImage = async (id, data) => {
    return imageDao.updateImage(id, data);
}

const findImage = (id) => {
    return imageDao.findImage(id);
}

const findManyImages = (filterObj) => {
    return imageDao.findManyImages(filterObj);
}

const findManyImagesByOffset = (filterObj) => {
    return imageDao.findManyImagesByOffset(filterObj);
}

const deleteImage = (id) => {
    return imageDao.deleteImage(id);
}

module.exports = {
    createImage,
    updateImage,
    findImage,
    findManyImages,
    findManyImagesByOffset,
    deleteImage
}
