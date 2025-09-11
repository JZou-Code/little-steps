const prisma = require('../prisma/client');

async function createNewsletter(data) {

    console.log(data)
    try {
        const resData = await prisma.newsletter.create({data});
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

async function updateNewsletter(id, data) {
    console.log(id)
    console.log(data)
    return prisma.newsletter.update(
        {
            where: {id},
            data
        }
    );
}

async function findNewsletter(id) {
    return prisma.newsletter.findUnique({where: {id}});
}

async function findManyNewsletters(data) {
    return prisma.newsletter.findMany({where: data});
}

async function findManyNewslettersByOffset(data) {
    try {
        const res = await prisma.newsletter.findMany({
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

async function deleteNewsletter(id) {
    return prisma.newsletter.delete({where: {id}});
}

module.exports = {
    createNewsletter,
    updateNewsletter,
    findNewsletter,
    findManyNewsletters,
    findManyNewslettersByOffset,
    deleteNewsletter
}
