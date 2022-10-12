import axios from 'axios';
const BASE_URL = 'website/user/pictures';

export default {
    store(token, payload) {
        return axios.post(BASE_URL, payload, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },
};


