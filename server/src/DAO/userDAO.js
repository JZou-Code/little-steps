const prisma = require('../prisma/client');

async function createUser(data) {
    try {
        const resData = await prisma.user.create({data});
        return {
            code: '200',
            message: 'ok',
            data: resData
        }
    } catch (e) {
        if (e.code === 'P2002') {
            return {
                code: '409',
                message: 'Email already exists',
                data: {}
            }
        } else {
            return {
                code: '500',
                message: 'Internal server error',
                data: {}
            }
        }
    }
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

async function findManyUsersByOffset(data) {
    try {
        const res = await prisma.user.findMany({
            ...data,
            take: data.take + 1
        });

        const newData = res.map(item => {
            return {
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                role: item.role
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

async function deleteUser(id) {
    return prisma.user.delete({where: {id}});
}

module.exports = {
    createUser,
    updateUser,
    findUser,
    findManyUsers,
    findManyUsersByOffset,
    deleteUser,
    findUserByEmail
}
