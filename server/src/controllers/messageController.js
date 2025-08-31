const messageService = require('../services/messageService');

const createMessage = async (req, res) => {
    const data = req.body;
    const result = await messageService.createMessage(data)
    res.send(result)
}

const findManyMessages = async (req, res) => {
    const filter = {...req.query};
    const result = await messageService.findManyMessages(filter)
    res.send(result)
}

const findManyMessagesByOffset = async (req, res) => {
    const filter = req.body;
    const result = await messageService.findManyMessagesByOffset(filter)
    res.send(result)
}

module.exports = {
    createMessage,
    findManyMessages,
    findManyMessagesByOffset
}
