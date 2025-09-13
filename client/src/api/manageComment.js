import axiosApi from "./axiosApi.js";

export const createComment = (data) => {
    return axiosApi.post(
        `/comment/create-comment/`,
        data
    )
}

export const fetchNewsletters = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/newsletter/find-many-newsletters-by-offset',
        {skip, take, orderBy}
    )
}
