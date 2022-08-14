import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routers";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(createPinia()).use(router).mount("#app");
