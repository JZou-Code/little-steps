/**
 * Newsletter Data Access Object (DAO) that handles newsletter-related database operations
 * Provides CRUD operations for newsletter entities using Prisma ORM
 * Includes image relationship handling and pagination support
 */

const prisma = require('../prisma/client');

/**
 * Creates a new newsletter record in the database
 * @param {Object} data - Newsletter data to create
 * @returns {Promise<Object>} Result object with code, message, and data
 */
async function createNewsletter(data) {
    try {
        const resData = await prisma.newsletter.create({data});
        return {
            code: '200',
            message: 'ok',
            data: resData
        }
    } catch (e) {
        console.log(e)
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function updateNewsletter(id, data) {
    return prisma.newsletter.update(
        {
            where: {id},
            data
        }
    );
}

async function findNewsletter(id) {
    return prisma.newsletter.findUnique({where: {id}});
}

async function findManyNewsletters(data) {
    return prisma.newsletter.findMany({where: data});
}

/**
 * Finds newsletters with pagination and associated images
 * @param {Object} data - Query parameters including skip, take, orderBy, where
 * @returns {Promise<Object>} Result object with pagination info and newsletter data including images
 */
async function findManyNewslettersByOffset(data) {
    try {
        const res = await prisma.newsletter.findMany({
            ...data,
            take: data.take + 1,
            include: {
                ArticleImage: {
                    orderBy: {position: 'asc'},
                    select: {id: true, storageKey: true, position: true, mimeType: true, createdAt: true},
                },
            }
        });
        return {
            code: '200',
            hasNext: res.length === data.take + 1,
            message: 'ok',
            data: res
        }
    } catch (e) {
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function deleteNewsletter(id) {
    return prisma.newsletter.delete({where: {id}});
}

module.exports = {
    createNewsletter,
    updateNewsletter,
    findNewsletter,
    findManyNewsletters,
    findManyNewslettersByOffset,
    deleteNewsletter
}
