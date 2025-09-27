import axiosApi from "./axiosApi.js";

export const fetchMessages = (skip, take, orderBy = {}, id) => {
    return axiosApi.post(
        `/message/find-many-messages-by-offset`,
        {skip, take, orderBy, where:{childId:id}}
    )
}

export const addMessage = (data) => {
    return axiosApi.post(
        `/message/create-message`,
        {...data}
    )
}
