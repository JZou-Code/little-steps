const prisma = require('../prisma/client');

async function createComment(data) {

    console.log(data)
    try {
        const resData = await prisma.comment.create({data});
        return {
            code: '200',
            message: 'ok',
            data: resData
        }
    } catch (e) {
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function findComment(id) {
    return prisma.comment.findUnique({where: {id}});
}

async function findManyComments(data) {
    return prisma.comment.findMany({where: data});
}

async function findManyCommentsByOffset(data) {
    try {
        const res = await prisma.comment.findMany({
            skip: data.skip,
            take: data.take + 1,
            include: {
                author: {select: {id: true, firstName: true, lastName: true}}
            },
            where: {
                newsletterId: data.id
            }
        });

        return {
            code: '200',
            hasNext: res.length === data.take + 1,
            message: 'ok',
            data: res
        }
    } catch (e) {
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function deleteComment(id) {
    return prisma.comment.delete({where: {id}});
}

module.exports = {
    createComment,
    findComment,
    findManyComments,
    findManyCommentsByOffset,
    deleteComment
}
