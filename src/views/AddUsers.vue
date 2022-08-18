<template>
    Teste
    <ul v-auto-animate>
        <li v-for="(u, index) in users" :key="u.id" @click="selectUser(u)">
            {{ index }} - {{ u.name }}
        </li>
    </ul>
    <Button text="Criar Pool!" @click="addUsers()" />
</template>

<script>
import { useTokenStore } from "../stores/token.store";
import { useUserStore } from "../stores/user.store";
import { buildAuthHeader } from "../utils/index";
import Button from "../components/Button.vue";
import { api } from "../services/api";

export default {
    name: "AddUsers",
    components: { Button },
    setup() {
        const token = useTokenStore();
        const user = useUserStore();

        return {
            token,
            user,
        };
    },
    data() {
        return {
            users: [],
            selected: [],
        };
    },
    methods: {
        selectUser(user) {
            this.users = this.users.filter((item) =>
                item.id === user.id
                    ? this.selected.push(item.id) && false
                    : true
            );
            console.log(this.selected);
        },
        async fetchMe(config) {
            console.log("aiaai");
            if (this.user.isDefined) {
                console.log(this.user.normal);
                return "ok";
            }

            await this.fetchUser(config);
        },
        async fetchUser(config) {
            const result = await api.get("user/me", config);
            this.user.set(result.data);
            console.log(this.user.normal);
        },
        async fetchAllUsers(config) {
            return await api.get("user", config);
        },
        async addUsers() {
            const config = buildAuthHeader(this.token.withBearer);
            const body = { users: this.selected };
            try {
                const result = await api.post(
                    `pool/${this.$route.params.id}`,
                    body,
                    config
                );
                this.selected = [];
                console.log(result);
            } catch (err) {
                if (err.response.status === 403) {
                    alert("Adicione pelo menos um usuário novo");
                }
                console.log(err);
            }
        },
    },
    async mounted() {
        try {
            const config = buildAuthHeader(this.token.withBearer);
            const [_, users] = await Promise.all([
                this.fetchMe(config),
                this.fetchAllUsers(config),
            ]);
            console.log(users);
            this.users = users.data;
        } catch (err) {
            console.log(err);
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";
@import "../styles/mixins";

li {
    padding: 20px;
    background: $main-green;
}
</style>
