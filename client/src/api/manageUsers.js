import axios from "axios";
import axiosApi from "./axiosApi.js";

export const deleteUserById = (id) => {
    // return axios.delete(
    //     `http://localhost:3000/user/delete-user/${id}`,
    // )
    return axiosApi.delete(
        `/user/delete-user/${id}`,
    )
}

export const updateUserById = (id, data) => {
    // return axios.put(
    //     `http://localhost:3000/user/update-user`,
    //     {id, ...data}
    // )
    return axiosApi.put(
        `/user/update-user`,
        {id, ...data}
    )
}

export const requestRefresh = () => {
    // return axios.post(
    //     '/api/user/refresh-token',
    //     {}
    // )
    return axiosApi.post(
        '/user/refresh-token',
        {}
    )
}

export const requestLogout = (id) => {
    // return axios.post(
    //     '/api/user/logout',
    //     {
    //         id
    //     }
    // )
    return axiosApi.post(
        '/user/logout',
        {
            id
        }
    )
}


