<script>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { api } from "../services/api";
import { useTokenStore } from "../stores/token.store";

export default {
    name: "SignIn",
    components: { Input, Button },
    data() {
        return {
            email: "",
            password: "",
            loading: false,
            res: { err: undefined, data: undefined },
        };
    },
    setup() {
        const token = useTokenStore();
        return {
            token,
        };
    },
    methods: {
        setEmail(update) {
            this.email = update;
        },
        setPassword(update) {
            this.password = update;
        },
        async postData(event) {
            event.preventDefault();
            console.log(this.token.normal);
            this.loading = true;
            try {
                const body = {
                    email: this.email,
                    password: this.password,
                };
                const result = await api.post("auth/signin", body);
                this.res.data = result;
                this.token.set(result.data.token);
                this.$router.push("/home");
            } catch (err) {
                this.res.err = err;
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        console.log(import.meta.env.VITE_API_URL);
    },
};
</script>

<template>
    <main>
        <h1>voting.pool</h1>
        <p>Faça seu Login!</p>
        <form @submit="postData($event)">
            <Input
                type="email"
                :setter="setEmail"
                icon="mail-outline"
                placeholder="Insira seu Email..."
                required
            />
            <Input
                type="password"
                :setter="setPassword"
                icon="key-outline"
                placeholder="Insira sua Senha..."
                required
            />
            <Button text="Login" icon="log-in-outline" :loading="loading" />
            <router-link to="/signup"
                >Não possui conta, Faça cadastro!</router-link
            >
        </form>
    </main>
</template>

<style lang="scss" scoped>
@import "../styles/mixins";

main {
    width: 70%;
    margin-inline: auto;
    min-height: 100vh;
    @include flex-center(column, 30px);

    h1 {
        @include title-font();
        font-weight: 700;
        font-size: 38px;
        color: $main-green;
        margin-bottom: 35px;
    }
}

form {
    @include flex-center(column, 30px);
    width: 100%;

    a {
        position: absolute;
        bottom: 7vh;
        font-size: 18px;
        font-weight: 600;
        color: $soft-green;
    }
}
</style>
