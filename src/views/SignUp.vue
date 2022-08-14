<script>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { api } from "../services/api";

export default {
    name: "SignUp",
    components: { Input, Button },
    data() {
        return {
            email: "",
            password: "",
            loading: false,
        };
    },
    methods: {
        setEmail(update) {
            this.email = update;
        },
        setPassword(update) {
            this.password = update;
        },
        async fetchData() {
            console.log(this.loading);
            this.loading = true;
            const res = { err: undefined, data: undefined };
            // try {
            //     const result = await api.get("/signin");
            //     console.log("deu certo");
            //     res.data = result;
            // } catch (err) {
            //     console.log("Erro");
            //     res.err = err;
            // } finally {
            //     this.loading = false;
            // }
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
        <form>
            <Input
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
            <Button
                text="Login"
                icon="log-in-outline"
                @click="fetchData()"
                :loading="loading"
            />
            <router-link to="/signin"
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
