import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSpinners from "vue-spinners";
import CxltToastr from "cxlt-vue2-toastr";

const toastrConfigs = {
    position: "top right"
};
Vue.use(CxltToastr, toastrConfigs);
Vue.use(VueSpinners);
Vue.config.productionTip = false;

const localURL = "http://127.0.0.1:8000/api/";
axios.defaults.baseURL = localURL;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
