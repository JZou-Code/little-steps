import axios from "axios";

export const fetchUsers = (skip, take, orderBy = {}) =>{
    return axios.post(
        'http://localhost:3000/user/find-many-users-by-offset',
        {skip, take, orderBy}
    )
}
