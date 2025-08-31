const messagedDao = require('../DAO/messageDAO');

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
