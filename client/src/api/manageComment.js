import axiosApi from "./axiosApi.js";

export const createComment = (data) => {
    return axiosApi.post(
        `/comment/create-comment/`,
        data
    )
}

export const fetchComments = (skip, take, orderBy = {}, id) => {
    return axiosApi.post(
        '/comment/find-many-comments-by-offset',
        {skip, take, orderBy, id}
    )
}
