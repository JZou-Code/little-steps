/**
 * Image Data Access Object (DAO) that handles article image database operations
 * Provides CRUD operations for article images using Prisma ORM
 * Includes newsletter relationship handling and pagination support
 */

const prisma = require('../prisma/client');

/**
 * Creates a new article image record in the database
 * @param {string} key - Storage key for the image
 * @param {string} mimeType - MIME type of the image
 * @param {number} index - Position index of the image
 * @param {string} id - Newsletter ID to associate the image with
 * @returns {Promise<Object>} Result object with code, message, and data
 */
async function createImage(key, mimeType, index, id) {
    try {
        const resData =
            await prisma.articleImage.create({
                data: {
                    newsletterId: id,
                    storageKey: key,
                    mimeType,
                    position: index
                }
            });
        return {
            code: '200',
            message: 'ok',
            data: resData
        }
    } catch (e) {
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function updateImage(id, data) {
    console.log(id)
    console.log(data)
    return prisma.articleImage.update(
        {
            where: {id},
            data
        }
    );
}

async function findImage(id) {
    return prisma.articleImage.findUnique({where: {id}});
}

async function findManyImages(data) {
    return prisma.articleImage.findMany({where: data});
}

async function findManyImagesByOffset(data) {
    try {
        const res = await prisma.articleImage.findMany({
            ...data,
            take: data.take + 1,
            include: {parent: {select: {firstName: true, lastName: true}}}
        });

        const newData = res.map(item => {
            const flag = item?.parent?.firstName || item?.parent?.lastName
            return {
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                dob: item.dob,
                gender: item.gender,
                parent: flag ? item?.parent?.firstName + ' ' + item?.parent?.lastName : '',
                parentId: item.parentId
            }
        })

        return {
            code: '200',
            hasNext: newData.length === data.take + 1,
            message: 'ok',
            data: newData
        }
    } catch (e) {
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function deleteImage(id) {
    return prisma.articleImage.delete({where: {id}});
}

module.exports = {
    createImage,
    updateImage,
    findImage,
    findManyImages,
    findManyImagesByOffset,
    deleteImage
}
