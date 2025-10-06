/**
 * Message Data Access Object (DAO) that handles message-related database operations
 * Provides operations for creating and retrieving child messages using Prisma ORM
 * Includes pagination support for message lists
 */

const prisma = require('../prisma/client');

/**
 * Creates a new message record in the database
 * @param {Object} data - Message data to create
 * @returns {Promise<Object>} Result object with code, message, and data
 */
async function createMessage(data) {
    try {
        const resData = await prisma.childMessage.create({data});
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

async function findManyMessages(data) {
    return prisma.childMessage.findMany({where: data});
}

/**
 * Finds messages with pagination support
 * @param {Object} data - Query parameters including skip, take, orderBy, where
 * @returns {Promise<Object>} Result object with pagination info and message data
 */
async function findManyMessagesByOffset(data) {
    try {
        const res = await prisma.childMessage.findMany({
            ...data,
            take: data.take + 1,
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

module.exports = {
    createMessage,
    findManyMessages,
    findManyMessagesByOffset
}
