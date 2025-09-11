const newsletterDao = require('../DAO/newsletterDAO');

const createNewsletter = async (data) => {
    return newsletterDao.createNewsletter(data)
}

const updateNewsletter = async (id, data) => {
    return newsletterDao.updateNewsletter(id, data);
}

const findNewsletter = (id) => {
    return newsletterDao.findNewsletter(id);
}

const findManyNewsletters = (filterObj) => {
    return newsletterDao.findManyNewsletters(filterObj);
}

const findManyNewslettersByOffset = (filterObj) => {
    return newsletterDao.findManyNewslettersByOffset(filterObj);
}

const deleteNewsletter = (id) => {
    return newsletterDao.deleteNewsletter(id);
}

module.exports = {
    createNewsletter,
    updateNewsletter,
    findNewsletter,
    findManyNewsletters,
    findManyNewslettersByOffset,
    deleteNewsletter
}
