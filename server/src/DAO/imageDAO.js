const prisma = require('../prisma/client');

async function createImage(file, index, id) {
    try {
        const resData =
            await prisma.articleImage.create({
                data: {
                    newsletterId: id,
                    storageKey: file.filename,
                    mimeType: file.mimetype,
                    position: index
                }
            });
        return {
            code: '200',
            message: 'ok',
            data: resData
        }
    } catch (e) {
        console.log('e=====', e)
        return {
            code: '500',
            message: 'Internal server error',
            data: {}
        }
    }
}

async function updateImage(id, data) {
    console.log(id)
    console.log(data)
    return prisma.articleImage.update(
        {
            where: {id},
            data
        }
    );
}

async function findImage(id) {
    return prisma.articleImage.findUnique({where: {id}});
}

async function findManyImages(data) {
    return prisma.articleImage.findMany({where: data});
}

async function findManyImagesByOffset(data) {
    try {
        const res = await prisma.articleImage.findMany({
            ...data,
            take: data.take + 1,
            include: {parent: {select: {firstName: true, lastName: true}}}
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

async function deleteImage(id) {
    return prisma.articleImage.delete({where: {id}});
}

module.exports = {
    createImage,
    updateImage,
    findImage,
    findManyImages,
    findManyImagesByOffset,
    deleteImage
}
