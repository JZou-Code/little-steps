/**
 * Message service that handles message-related business logic
 * Provides operations for creating and retrieving messages
 * Acts as a bridge between controllers and data access layer
 */

const messagedDao = require('../DAO/messageDAO');

/**
 * Creates a new message
 * @param {Object} data - Message data to create
 * @returns {Promise} Result from message DAO
 */
const createMessage = async (data) => {
    return messagedDao.createMessage(data)
}

const findManyMessages = (filterObj) => {
    return messagedDao.findManyMessages(filterObj);
}

const findManyMessagesByOffset = (filterObj) => {
    return messagedDao.findManyMessagesByOffset(filterObj);
}

module.exports = {
    createMessage,
    findManyMessages,
    findManyMessagesByOffset
}
