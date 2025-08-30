const prisma = require('../prisma/client');

async function createChild(data) {
    try {
        const resData = await prisma.child.create({data});
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
    console.log(id)
    console.log(data)
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

async function findManyChildrenByOffset(data) {
    try {
        const res = await prisma.child.findMany({
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

async function deleteChild(id) {
    return prisma.child.delete({where: {id}});
}

async function findParent(id) {
    return prisma.child.findUnique({
        where: {id},
        include: {parent: {select: {firstName: true, lastName: true}}}
    });
}

module.exports = {
    createChild,
    updateChild,
    findChild,
    findManyChildren,
    findManyChildrenByOffset,
    deleteChild,
    findParent
}
