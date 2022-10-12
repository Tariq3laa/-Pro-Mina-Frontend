import api from "../../api/auth";

const state = {
    user: JSON.parse(window.localStorage.getItem("user")),
    token: window.localStorage.getItem("token"),
};

const getters = {
    user: (state) => state.user,
    isLoggedIn: (state) => !!state.token,
};

const actions = {
    async register({ commit }, payload) {
        const response = await api.register(payload);
        commit("setUser", response.data);
        commit("setToken", response.data.access_token);
        window.localStorage.setItem("user", JSON.stringify(response.data));
        window.localStorage.setItem("token", response.data.access_token);
    },

    async login({ commit }, payload) {
        const response = await api.login(payload);
        commit("setUser", response.data);
        commit("setToken", response.data.access_token);
        window.localStorage.setItem("user", JSON.stringify(response.data));
        window.localStorage.setItem("token", response.data.access_token);
    },

    async logout({ state, commit }) {
        await api.logout(state.token);
        commit("setUser", null);
        commit("setToken", null);
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
    },
};

const mutations = {
    setToken: (state, token) => (state.token = token),
    setUser: (state, user) => (state.user = user),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
