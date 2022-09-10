<template>
    <main>
        <h1>voting.pool</h1>
        <p>Faça seu cadastro</p>
        <form @submit="signUp($event)">
            <Input
                :setter="setValue('name')"
                placeholder="*Username..."
                icon="person-outline"
                required
            />
            <Input
                :setter="setValue('email')"
                placeholder="*Email..."
                type="email"
                icon="mail-outline"
                required
            />
            <Input
                :setter="setValue('imageUrl')"
                placeholder="Foto(url)..."
                icon="image-outline"
            />
            <Input
                :setter="setValue('password')"
                placeholder="*Senha..."
                icon="key-outline"
                required
            />
            <Button
                text="Cadastre-se"
                icon="id-card-outline"
                :loading="loading"
            />
            <router-link to="/">Já possui conta, Faça Login!</router-link>
        </form>
    </main>
</template>

<script>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { api } from "../services/api";
import { useToast } from "vue-toastification";

export default {
    name: "SignIn",
    components: {
        Input,
        Button,
    },
    setup() {
        const toast = useToast();

        return {
            toast,
        };
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            imageUrl: "",
            loading: false,
        };
    },
    methods: {
        setValue(itemName) {
            return (value) => {
                this[itemName] = value;
            };
        },

        async signUp(event) {
            event.preventDefault();
            const body = {
                name: this.name,
                email: this.email,
                imageUrl: this.imageUrl,
                password: this.password,
            };
            if (!body.imageUrl) {
                delete body.imageUrl;
            }
            this.loading = true;
            try {
                const result = await api.post("auth/signup", body);
                this.toast.success("Usuário criado com sucesso!");
                this.$router.push("/");
            } catch (err) {
                console.log(err);
                if (err.response.status == 409) {
                    this.toast.error(err.response.data.message);
                } else {
                    this.toast.error("Erro ao criar usuário!");
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

main {
    width: 80%;
    margin-inline: auto;
    min-height: 100vh;
    @include flex-center(column, 30px);

    h1 {
        @include title-font();
        font-weight: 700;
        font-size: 38px;
        color: $main-green;
        margin-bottom: 20px;
    }
}

@import "../styles/partials/forms";
</style>
