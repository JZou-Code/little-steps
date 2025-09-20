import axios from "axios";
import axiosApi from "./axiosApi.js";

export const deleteChildById = (id) => {
    // return axios.delete(
    //     `http://localhost:3000/child/delete-child/${id}`,
    // )
    return axiosApi.delete(
        `/child/delete-child/${id}`,
    )
}

export const updateChildById = (id, data) => {
    return axiosApi.put(
        `/child/update-child`,
        {id, ...data}
    )
}

export const addNewChild = (data) => {
    return axiosApi.post(
        '/child/create-child',
        data
    )
}
