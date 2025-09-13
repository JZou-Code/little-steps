const commentDao = require('../DAO/commentDAO');

const createComment = async (data) => {
    return commentDao.createComment(data)
}

const findComment = (id) => {
    return commentDao.findComment(id);
}

const findManyComments = (filterObj) => {
    return commentDao.findManyComments(filterObj);
}

const findManyCommentsByOffset = (filterObj) => {
    return commentDao.findManyCommentsByOffset(filterObj);
}

const deleteComment = (id) => {
    return commentDao.deleteComment(id);
}

module.exports = {
    createComment,
    findComment,
    findManyComments,
    findManyCommentsByOffset,
    deleteComment
}

