const prisma = require('../prisma/client');

async function createUser(data){
    return await prisma.userTest.create({data});
}

module.exports = {
    createUser
}