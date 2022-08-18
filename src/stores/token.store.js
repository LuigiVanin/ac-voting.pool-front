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
        withBearer(state) {
            return `Bearer ${state.token}`;
        },
        normal(state) {
            return state.token;
        },
        isAuth(state) {
            return (
                state.token !== "" ||
                state.token !== undefined ||
                state.token !== null
            );
        },
    },
});
