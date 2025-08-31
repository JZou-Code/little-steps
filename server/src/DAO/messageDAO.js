const prisma = require('../prisma/client');

async function createMessage(data) {
    try {
        const resData = await prisma.childMessage.create({data});
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

async function findManyMessages(data) {
    return prisma.childMessage.findMany({where: data});
}

async function findManyMessagesByOffset(data) {
    try {
        const res = await prisma.childMessage.findMany({
            ...data,
            take: data.take + 1,
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

module.exports = {
    createMessage,
    findManyMessages,
    findManyMessagesByOffset
}
