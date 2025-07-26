const prisma = require('../prisma/client');

async function createChild(data) {
    console.log(data)
    return prisma.child.create({data});
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