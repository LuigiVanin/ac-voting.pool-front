import { defineStore } from "pinia";

export const useSideBarStore = defineStore("sidebar", {
    state: () => {
        return {
            sidebar: false,
        };
    },
    actions: {
        toggle() {
            this.sidebar = !this.sidebar;
        },
        off() {
            this.sidebar = false;
        },
        on() {
            this.sidebar = true;
        },
    },
    getters: {
        value: (state) => {
            return state.sidebar;
        },
    },
});
