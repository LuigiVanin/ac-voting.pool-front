import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: { data: undefined },
        };
    },
    actions: {
        set(userData) {
            // window.localStorage.setItem("user", JSON.stringify(userData));
            this.user.data = userData;
        },
        unset() {
            // window.localStorage.setItem("user", "");
            this.user.data = undefined;
        },
    },
    getters: {
        normal(state) {
            return state.user.data;
        },
        isDefined(state) {
            return !!state.user.data;
        },
    },
});
