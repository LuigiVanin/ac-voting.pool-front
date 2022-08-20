<template>
    <main>
        <Cancel />
        <div class="container">
            <Input
                placeholder="Buscar..."
                icon="search-outline"
                :setter="setSearch"
            />
            <Button
                text="Adicionar Usuários"
                icon="person-add-outline"
                @click="addUsers()"
            />
            <hr v-show="selected.length" />
            <h1 v-show="selected.length">Selecionados:</h1>
            <ul v-auto-animate>
                <li v-for="u in selected" :key="u.id" @click="unSelectUser(u)">
                    <UserImage :src="u.imageUrl" size="100px" />
                    <h1>
                        {{ u.name }}
                    </h1>
                </li>
            </ul>

            <hr />

            <ul v-auto-animate>
                <li
                    v-for="u in searchUsers(users)"
                    :key="u.id"
                    @click="selectUser(u)"
                >
                    <UserImage :src="u.imageUrl" size="100px" />
                    <h1>
                        {{ u.name }}
                    </h1>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
import { useTokenStore } from "../stores/token.store";
import { useUserStore } from "../stores/user.store";
import { buildAuthHeader } from "../utils/index";
import Button from "../components/Button.vue";
import { api } from "../services/api";
import UserImage from "../components/UserImage.vue";
import Input from "../components/Input.vue";
import Cancel from "../components/Cancel.vue";

export default {
    name: "AddUsers",
    components: { Button, UserImage, Input, Cancel },
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
            search: "",
        };
    },
    methods: {
        setSearch(value) {
            this.search = value;
        },
        searchUsers(itens) {
            if (!this.search) return itens;
            return itens.filter(
                (item) =>
                    item.name
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) ||
                    item.email.includes(this.search.toLowerCase())
            );
        },
        selectUser(user) {
            this.users = this.users.filter((item) =>
                item.id === user.id ? this.selected.push(item) && false : true
            );
        },
        unSelectUser(user) {
            this.selected = this.selected.filter((item) =>
                item.id === user.id ? this.users.push(item) && false : true
            );
        },
        getOnlyId(users) {
            return users.map((u) => u.id);
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
            const body = { users: this.getOnlyId(this.selected) };
            try {
                const result = await api.post(
                    `pool/${this.$route.params.id}`,
                    body,
                    config
                );
                this.selected = [];
                this.$router.push(`/pool/${this.$route.params.id}/room`);
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

main {
    min-height: 100vh;
    width: 100%;
    padding-top: 70px;
    padding-bottom: 70px;
    @include flex(center, center);
    .container {
        width: 65%;
        @include flex-center(column, 10px);
        button {
            width: 100%;
        }
        h1 {
            @include title-font();
            font-weight: bold;
            color: $dark-gray;
            font-size: 19px;
        }
        hr {
            width: 80%;
            margin-block: 15px;
            color: rgb(236, 236, 236);
        }
        ul {
            @include flex(center, space-around, $gap: 20px);
            flex-wrap: wrap;
            padding-inline: 20px;
            max-height: 58vh;
            overflow-y: scroll;
        }
        li {
            @include flex-center(column, 5px);

            /* padding: 20px; */
            width: 100px;
            cursor: pointer;

            h1 {
                width: 100%;
                /* word-wrap: break-word; */
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                @include title-font();
                text-align: center;
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
}
</style>
