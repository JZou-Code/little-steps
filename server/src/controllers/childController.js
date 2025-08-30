const childService = require('../services/childService');

const createChild = async (req, res) => {
    const data = req.body;
    const result = await childService.createChild(data)
    console.log(result)
    res.send(result)
}

const updateChild = async (req, res) => {
    const {id, ...data} = req.body;
    const result = await childService.updateChild(id, data)
    res.send(result)
}

const findChild = async (req, res) => {
    const {id} = req.query;
    const result = await childService.findChild(id)
    res.send(result)
}

const findManyChildren = async (req, res) => {
    const filter = {...req.query};
    const result = await childService.findManyChildren(filter)
    res.send(result)
}

const findManyChildrenByOffset = async (req, res) => {
    const filter = req.body;
    const result = await childService.findManyChildrenByOffset(filter)
    res.send(result)
}

const deleteChild = async (req, res) => {
    const {id} = req.query;
    const result = await childService.deleteChild(id)
    res.send(result)
}

module.exports = {
    createChild,
    updateChild,
    findChild,
    findManyChildren,
    findManyChildrenByOffset,
    deleteChild
}
