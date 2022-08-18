<template>
    <router-view />
</template>

<script>
import { useTokenStore } from "./stores/token.store";
import { useUserStore } from "./stores/user.store";
import { buildAuthHeader } from "./utils";
import { api } from "./services/api";

export default {
    setup() {
        const token = useTokenStore();
        const user = useUserStore();

        return {
            user,
            token,
        };
    },

    methods: {
        async userDataRequest(config) {
            const result = await api.get("user/me", config);
            this.user.set(result.data);
        },

        async fetchUser() {
            console.log("Quer horrorrrr");
            try {
                const config = buildAuthHeader(this.token.withBearer);
                await this.userDataRequest(config);
            } catch (err) {
                console.log(err);
            }
        },
    },
    async mounted() {
        await this.fetchUser();
    },

    watch: {
        async $route(to, from) {
            console.log("teste");
            // console.log(this.user);
            if (!this.user.isDefined) {
                await this.fetchUser();
            }
        },
    },
};
</script>

<style lang="scss">
@import "./styles/reset";
@import "./styles/style";
</style>
