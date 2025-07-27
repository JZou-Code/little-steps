const prisma = require('../prisma/client');

async function createUser(data) {
    return prisma.user.create({data});
}

async function updateUser(id, data) {
    return prisma.user.update(
        {
            where: {id},
            data
        }
    );
}

async function findUser(id) {
    return prisma.user.findUnique({where: {id}});
}

async function findUserByEmail(email) {
    return prisma.user.findUnique({where: {email}});
}

async function findManyUsers(data) {
    return prisma.user.findMany({where: data});
}

async function deleteUser(id) {
    return prisma.user.delete({where: {id}});
}

module.exports = {
    createUser,
    updateUser,
    findUser,
    findManyUsers,
    deleteUser,
    findUserByEmail
}