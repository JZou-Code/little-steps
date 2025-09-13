import axiosApi from "./axiosApi.js";

export const createNewsletter = (data) => {
    return axiosApi.post(
        `/newsletter/create-newsletter/`,
        data
    )
}
