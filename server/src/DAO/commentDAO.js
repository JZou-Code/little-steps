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
            ...data,
            take: data.take + 1,
            include: {parent: {select: {firstName:true, lastName:true}}}
        });

        const newData = res.map(item => {
            const flag = item?.parent?.firstName || item?.parent?.lastName
            return {
                id: item.id,
                firstName: item.firstName,
                lastName: item.lastName,
                dob: item.dob,
                gender: item.gender,
                parent: flag ? item?.parent?.firstName + ' ' + item?.parent?.lastName : '',
                parentId: item.parentId
            }
        })

        return {
            code: '200',
            hasNext: newData.length === data.take + 1,
            message: 'ok',
            data: newData
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
