import axios from 'axios';
const BASE_URL = 'website/user';

export default {
    register (payload) {
        return axios.post(`${BASE_URL}/register`, {
            ...payload
        })
    },

    login (payload) {
        return axios.post(`${BASE_URL}/login`, {
            ...payload
        })
    }, 

    logout(token) {
        return axios.post(`${BASE_URL}/logout`, {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
    },
};
