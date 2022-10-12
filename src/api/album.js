import axios from 'axios';
const BASE_URL = 'website/user/albums';

export default {
    index(token) {
        return axios.get(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    store(token, payload) {
        return axios.post(BASE_URL, payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    show(token, id) {
        return axios.get(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    update(token, id, payload) {
        return axios.post(`${BASE_URL}/${id}?_method=PUT`, payload, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
    },

    delete(token, id) {
        return axios.delete(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    move(token, source, destination) {
        return axios.post(`website/user/move/album/${source}/${destination}`,{}, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    dropDown(token, id) {
        return axios.get(`website/user/drop-down/album/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },
};


