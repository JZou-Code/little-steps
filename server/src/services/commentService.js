/**
 * Comment service that handles comment-related business logic
 * Provides CRUD operations for comments
 * Acts as a bridge between controllers and data access layer
 */

const commentDao = require('../DAO/commentDAO');

/**
 * Creates a new comment
 * @param {Object} data - Comment data to create
 * @returns {Promise} Result from comment DAO
 */
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

