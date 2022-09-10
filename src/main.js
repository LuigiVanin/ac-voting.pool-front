import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routers";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "top-center",
    id: "toast",
};

createApp(App)
    .use(createPinia())
    .use(router)
    .use(autoAnimatePlugin)
    .use(Toast, options)
    .mount("#app");
