import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import album from "./modules/album";
import picture from "./modules/picture";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        album,
        picture,
    },
});
