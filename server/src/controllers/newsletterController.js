const newsletterService = require('../services/newsletterService');

const createNewsletter = async (req, res) => {
    const data = req.body;
    const result = await newsletterService.createNewsletter(data)
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
