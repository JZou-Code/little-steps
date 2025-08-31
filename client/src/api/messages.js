import axios from "axios";

export const fetchMessages = (skip, take, orderBy = {}, id) => {
    return axios.post(
        `http://localhost:3000/message/find-many-messages-by-offset`,
        {skip, take, orderBy, where:{childId:id}}
    )
}

export const addMessage = (data) => {
    return axios.post(
        `http://localhost:3000/message/create-message`,
        {...data}
    )
}
