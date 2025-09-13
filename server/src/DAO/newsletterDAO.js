const prisma = require('../prisma/client');

async function createNewsletter(data) {
    try {
        console.log('newsletterDAO data===================', data)
        const resData = await prisma.newsletter.create({data});
        return {
            code: '200',
            message: 'ok',
            data: resData
        }
    } catch (e) {
        console.log(e)
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function updateNewsletter(id, data) {
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
            include: {
                ArticleImage: {
                    orderBy: {position: 'asc'},
                    select: {id: true, storageKey: true, position: true, mimeType: true, createdAt: true},
                },
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
