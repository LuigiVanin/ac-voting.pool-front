import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
    state: () => {
        return {
            token: window.localStorage.getItem("token"),
        };
    },
    actions: {
        set(token) {
            this.token = token;
            window.localStorage.setItem("token", token);
        },
        unset() {
            this.token = "";
            window.localStorage.setItem("token", "");
        },
    },
    getters: {
        withBearer() {
            return `Bearer ${this.token}`;
        },
        normal() {
            return this.token;
        },
    },
});
