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
        },
    },
    getters: {
        getWithBearer() {
            return `Bearer ${this.token}`;
        },
    },
});
