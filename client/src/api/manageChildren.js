import axios from "axios";

export const deleteChildById = (id) => {
    return axios.delete(
        `http://localhost:3000/child/delete-child/${id}`,
    )
}

export const updateChildById = (id, data) => {
    return axios.put(
        `http://localhost:3000/child/update-child`,
        {id, ...data}
    )
}

export const addNewChild = (data) => {
    return axios.post(
        'http://localhost:3000/child/create-child',
        data
    )
}
