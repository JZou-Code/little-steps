const newsletterDao = require('../DAO/newsletterDAO');
const {createImage} = require("./imageService");

const createNewsletter = async (data, files) => {
    const res = await newsletterDao.createNewsletter(data);
    const errorObj = {
        code: '500',
        message: 'Internal error',
        data: {}
    }

    if(res.code !== 200 && res.code !== '200'){
        return errorObj
    }

    for (let i = 0; i < files.length; i++) {
        const data = await createImage(files[i], i, res.data?.id);
        if (data.code !== 200 && data.code !== '200') {
            return errorObj
        }
    }
    return res
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
