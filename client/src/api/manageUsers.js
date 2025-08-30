import axios from "axios";

export const deleteUserById = (id) => {
    return axios.delete(
        `http://localhost:3000/user/delete-user/${id}`,
    )
}

export const updateUserById = (id, data) => {
    return axios.put(
        `http://localhost:3000/user/update-user`,
        {id, ...data}
    )
}

