import {createRouter, createWebHistory} from "vue-router";
import middleware from "@grafikri/vue-middleware";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import VoteView from "../views/VoteView.vue";

import authentication from "../middleware/authentication";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/vote",
            name: "vote",
            component: VoteView,
            meta: {
                middleware: [authentication],
            },
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/",
        },
    ],
});

router.beforeEach(middleware());

export default router;
