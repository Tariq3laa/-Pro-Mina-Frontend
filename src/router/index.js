import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
        meta: {
            guest: true,
        },
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/auth/Register.vue"),
        meta: {
            guest: true,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/Dashboard.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/album/create",
        name: "album.create",
        component: () =>
            import(
                /* webpackChunkName: "album.create" */ "../views/dashboard/album/Create.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/album/:id/show",
        name: "album.show",
        component: () =>
            import(
                /* webpackChunkName: "album.edit" */ "../views/dashboard/album/Show.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/album/:id/edit",
        name: "album.edit",
        component: () =>
            import(
                /* webpackChunkName: "album.edit" */ "../views/dashboard/album/Edit.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/album/:id/delete",
        name: "album.delete",
        component: () =>
            import(
                /* webpackChunkName: "album.edit" */ "../views/dashboard/album/Delete.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/album/:id/picture/create",
        name: "picture.create",
        component: () =>
            import(
                /* webpackChunkName: "album.create" */ "../views/dashboard/picture/Create.vue"
            ),
        meta: {
            auth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.auth)) {
//         if (!store.getters.isLoggedIn) {
//             next({
//                 path: "/login",
//             });
//         } else {
//             next();
//         }
//     } else if (to.matched.some((record) => record.meta.guest)) {
//         if (!store.getters.isLoggedIn) {
//             next();
//         } else {
//             next({
//                 path: "/dashboard",
//             });
//         }
//     } else {
//         next();
//     }
// });

export default router;
