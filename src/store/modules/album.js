import api from '../../api/album';

const state = {
    albums: [],
    albumsDropDown: []
};

const getters = {
    albums: state => state.albums,
    albumsDropDown: state => state.albumsDropDown
};

const actions = {
    async fetchAlbums({rootState, commit}) {
        const { token } = rootState.auth;
        const response = await api.index(token);
        commit('setalbums', response.data.data)
    },

    async storeAlbum({rootState}, payload) {
        const { token } = rootState.auth;
        await api.store(token, payload);
    },

    async showAlbum({rootState}, payload) {
        const { token } = rootState.auth;
        const response = await api.show(token, payload.id);
        return response;
    },

    async updateAlbum({rootState}, payload) {
        const { token } = rootState.auth;
        await api.update(token, payload.id, payload);
    },

    async deleteAlbum({rootState}, payload) {
        const { token } = rootState.auth;
        await api.delete(token, payload.id);
    },

    async moveAlbum({rootState}, payload) {
        const { token } = rootState.auth;
        await api.move(token, payload.currentAlbum, payload.selectedAlbum);
    },

    async fetchDropDownAlbums({rootState, commit}, payload) {
        const { token } = rootState.auth;
        const response = await api.dropDown(token, payload.id);
        commit('setAlbumsDropDown', response.data)
    },
};

const mutations = {
    setalbums: (state, albums) => state.albums = albums,
    setAlbumsDropDown: (state, albumsDropDown) => state.albumsDropDown = albumsDropDown,
};

export default {
    state,
    getters,
    actions,
    mutations
}