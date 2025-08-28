const childDao = require('../DAO/childDAO');

const createChild = async (data) => {
    return childDao.createChild(data)
}

const updateChild = async (id, data) => {
    return childDao.updateChild(id, data);
}

const findChild = (id) => {
    return childDao.findChild(id);
}

const findManyChildren = (filterObj) => {
    return childDao.findManyChildren(filterObj);
}

const deleteChild = (id) => {
    return childDao.deleteChild(id);
}

module.exports = {
    createChild,
    updateChild,
    findChild,
    findManyChildren,
    deleteChild
}
