<template>
    <main>
        <h1>voting.pool</h1>
        <p>Faça seu Login!</p>
        <form @submit="postData($event)">
            <Input
                type="text"
                :setter="setEmail"
                icon="mail-outline"
                placeholder="Insira seu Email ou Username..."
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

<script>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { api } from "../services/api";
import { useTokenStore } from "../stores/token.store";
import { useToast } from "vue-toastification";

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
        const toast = useToast();
        return {
            token,
            toast,
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
                this.toast.success("usuário logado com sucesso");
                this.$router.push("home");
            } catch (err) {
                this.res.err = err;
                console.log(err);

                if (err.response.status == 404 || err.response.status == 403) {
                    this.toast.error(err.response.data.message);
                } else {
                    this.toast.error("Erro no login");
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

main {
    width: 80%;
    margin-inline: auto;
    min-height: 100vh;
    @include flex-center(column, 30px);
    @import "../styles/partials/forms";
    h1 {
        @include title-font();
        font-weight: 700;
        font-size: 38px;
        color: $main-green;
        margin-bottom: 35px;
    }
}
</style>
