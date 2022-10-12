import api from "../../api/picture";

const state = {};

const getters = {};

const actions = {
    async storePicture({ rootState }, payload) {
        const { token } = rootState.auth;
        const formData = new FormData();
        formData.append("title", payload.name);
        formData.append("selectedFile", payload.image);
        formData.append("album_id", payload.album_id);
        await api.store(token, formData);
    },
};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};
