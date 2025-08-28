const prisma = require('../prisma/client');

async function createChild(data) {
    try {
        const resData = await prisma.user.create({data});
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

async function updateChild(id, data) {
    return prisma.child.update(
        {
            where: {id},
            data
        }
    );
}

async function findChild(id) {
    return prisma.child.findUnique({where: {id}});
}

async function findManyChildren(data) {
    return prisma.child.findMany({where: data});
}

async function deleteChild(id) {
    return prisma.child.delete({where: {id}});
}

module.exports = {
    createChild,
    updateChild,
    findChild,
    findManyChildren,
    deleteChild
}
