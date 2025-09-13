import axiosApi from "./axiosApi.js";

export const createNewsletter = (data) => {
    return axiosApi.post(
        `/newsletter/create-newsletter/`,
        data
    )
}

export const fetchNewsletters = (skip, take, orderBy = {}) => {
    return axiosApi.post(
        '/newsletter/find-many-newsletters-by-offset',
        {skip, take, orderBy}
    )
}
