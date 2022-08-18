import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routers";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(createPinia())
    .use(router)
    .use(autoAnimatePlugin)
    .mount("#app");
