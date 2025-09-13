const commentService = require('../services/commentService');

const createComment = async (req, res) => {
    const data = req.body;
    const result = await commentService.createComment(data)
    res.send(result)
}

const findComment = async (req, res) => {
    const {id} = req.query;
    const result = await commentService.findComment(id)
    res.send(result)
}

const findManyComments = async (req, res) => {
    const filter = {...req.query};
    const result = await commentService.findManyComments(filter)
    res.send(result)
}

const findManyCommentsByOffset = async (req, res) => {
    const filter = req.body;
    const result = await commentService.findManyCommentsByOffset(filter)
    res.send(result)
}

const deleteComment = async (req, res) => {
    const {id} = req.query;
    const result = await commentService.deleteComment(id)
    res.send(result)
}

module.exports = {
    createComment,
    findComment,
    findManyComments,
    findManyCommentsByOffset,
    deleteComment
}
