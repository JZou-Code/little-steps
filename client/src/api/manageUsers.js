import axiosApi from "./axiosApi.js";

export const deleteUserById = (id) => {
    return axiosApi.delete(
        `/user/delete-user/${id}`,
    )
}

export const updateUserById = (id, data) => {
    return axiosApi.put(
        `/user/update-user`,
        {id, ...data}
    )
}

export const requestRefresh = () => {
    return axiosApi.post(
        '/user/refresh-token',
        {}
    )
}

export const requestLogout = (id) => {
    return axiosApi.post(
        '/user/logout',
        {
            id
        }
    )
}

export const requestChangePassword = (data) => {
    return axiosApi.post(
        '/user/logout',
        data
    )
}
