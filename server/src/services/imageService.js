/**
 * Image service that handles image-related business logic and S3 upload
 * Provides CRUD operations for article images with AWS S3 integration
 * Acts as a bridge between controllers and data access layer
 */

const imageDao = require('../DAO/imageDAO');
const {PutObjectCommand} = require('@aws-sdk/client-s3');
const path = require('path');
const crypto = require('crypto');
const {s3} = require('../utils/s3Tool');

const BUCKET = process.env.S3_BUCKET;

/**
 * Sanitizes filename for safe S3 key generation
 * @param {string} name - Original filename
 * @returns {string} Sanitized filename
 */
function safeKeySegment(name) {
    return name.replace(/\s+/g, '_');
}

/**
 * Uploads file buffer to AWS S3 with generated key
 * @param {Object} params - Upload parameters
 * @param {Buffer} params.buffer - File buffer data
 * @param {string} params.contentType - MIME type of the file
 * @param {number} params.index - File index for ordering
 * @param {string} params.originalname - Original filename
 * @returns {Promise<Object>} Object with S3 key and public URL
 */
async function uploadToS3({buffer, contentType, index, originalname}) {
    const ext = path.extname(originalname || '') || '';
    const hash = crypto.randomBytes(8).toString('hex');
    const base = safeKeySegment(path.basename(originalname || `file_${Date.now()}`, ext));
    const key = `files/${index}_${hash}_${base}${ext}`;

    const cmd = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
    });

    await s3.send(cmd);

    const publicBase = process.env.S3_PUBLIC_BASE_URL;
    const url = publicBase ? `${publicBase}/${key}` : undefined;

    return {key, url};
}

/**
 * Creates a new image record with S3 upload
 * @param {Object} file - File object from multer
 * @param {number} index - Image position index
 * @param {string} id - Newsletter ID to associate with
 * @returns {Promise<Object>} Result from image creation
 */
const createImage = async (file, index, id) => {
    // console.log(file)
    // return imageDao.createImage(file, index, id)
    try {
        const {buffer, mimetype, originalname, size} = file;

        const {key, url} = await uploadToS3({
            buffer,
            contentType: mimetype,
            index,
            originalname,
        });

        console.log(key)

        return await imageDao.createImage(key,mimetype,index,id);
    } catch (err) {
        console.error('createImage S3 upload error:', err);
        return {
            code: '500',
            message: 'Image upload failed',
            data: {},
        };
    }
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
