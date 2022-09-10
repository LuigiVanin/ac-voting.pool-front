<template>
    <main>
        <Cancel />
        <h1>criação de pool</h1>
        <form @submit="postPool($event)">
            <div class="field">
                <h2>> Nome da Pool:</h2>
                <Input :setter="setName" required />
            </div>
            <div class="field">
                <h2>> Descrição da Pool:</h2>
                <TextArea
                    :setter="setDesc"
                    text="Votação para decidir quem será o líder do grupo"
                />
            </div>
            <Button text="Criar Pool 🥳" :loading="loading" />
        </form>
    </main>
</template>

<script>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import TextArea from "../components/TextArea.vue";
import Header from "../components/Header.vue";
import Cancel from "../components/Cancel.vue";
import { api } from "../services/api";
import { useTokenStore } from "../stores/token.store";
import { buildAuthHeader } from "../utils";
import { useUserStore } from "../stores/user.store";

export default {
    name: "CreatePool",
    components: { Input, Button, TextArea, Header, Cancel },
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
            desc: "",
            name: "",
            loading: false,
        };
    },
    async mounted() {
        await this.fecthOnMount();
    },
    methods: {
        async fecthOnMount() {
            if (this.user.isDefined) {
                return "ok";
            }
            console.log(this.token.normal);
            this.loading = true;
            try {
                const config = buildAuthHeader(this.token.withBearer);
                await this.fetchUser(config);
            } catch (err) {
                console.log(err);
                this.$router.push("/");
            } finally {
                this.loading = false;
            }
        },
        async fetchUser(config) {
            const result = await api.get("user/me", config);
            this.user.set(result.data);
            console.log(this.user.normal);
        },
        setDesc(value) {
            this.desc = value;
        },
        setName(value) {
            this.name = value;
        },
        async postPool(event) {
            event.preventDefault();
            const body = {
                name: this.name,
                desc: this.desc,
            };
            const config = buildAuthHeader(this.token.withBearer);
            this.loading = true;
            try {
                const result = await api.post("/pool", body, config);
                console.log(result);
                if (!this.user.isDefined) throw new Error();
                this.$router.push(`/pool/${result.data.id}`);
            } catch (err) {
                if (err.response.status === 409) {
                    alert("Você já tem uma pool com esse nome");
                } else {
                    this.$router.push("/home");
                    console.log(err);
                }
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

@import "../styles/partials/forms";

main {
    @include flex-center(column);
    width: 100%;
    min-height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    animation: 1s $animation-tf starting-page;

    h1 {
        font-weight: bold;
        font-size: 42px;
        color: $main-green;
        @include title-font();
        margin-bottom: 35px;
        text-align: center;
    }

    form {
        width: 80%;
        .field {
            width: 100%;
            position: relative;

            &::after {
                content: "";
                top: 50%;
                left: -20px;
                position: absolute;
                width: 4px;
                background-color: $main-green;
                height: 0;
                transition: 0.5s $animation-tf;
            }

            &:hover::after {
                top: 0px;
                height: 100%;
            }
            h2 {
                margin-bottom: 15px;
                font-size: 23px;
                font-weight: 600;
                color: $main-green;
            }
        }
    }

    @include item-react(form);
}

@keyframes starting-page {
    0% {
        top: 200vh;
        position: fixed;
    }
    100% {
        top: 0;
        position: fixed;
    }
}

@media (max-width: 600px) {
    main {
        h1 {
            font-size: 32px;
        }
    }
}
</style>
