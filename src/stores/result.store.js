import { defineStore } from "pinia";

export const useResult = defineStore("result", {
    state: () => {
        return {
            data: {
                result: [],
                pool: {},
            },
        };
    },
    actions: {
        setResultData(poolResult) {
            this.data.result = poolResult;
        },
        setPoolData(poolData) {
            console.log(poolData);
            this.data.pool = poolData;
        },
    },
    getters: {
        poolResult(state) {
            return state.data.result;
        },
        poolData(state) {
            return state.data.pool;
        },
    },
});
