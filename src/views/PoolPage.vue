<template>
    <Header />
    <main>
        <side-bar />

        <div class="pool">
            <h1>Pool {{ $route.params.id || "0" }}</h1>
            <div class="progress-bar">
                <div class="progress" ref="progress"></div>
            </div>
            <h3 class="votes">
                votes:
                {{ !pool ? "-/-" : `${votes()}/${pool.Participants.length}` }}
            </h3>
            <nav :class="nav">
                <div class="voting" @click="() => (nav = 'vote')">voting</div>
                <div class="info" @click="() => (nav = 'info')">info</div>
            </nav>
            <h1 v-if="!pool">Nada Ainda</h1>
            <div v-else class="wrapper__feed">
                <div
                    class="cover"
                    v-show="(me.alreadyVoted || pool.closed) && nav === 'vote'"
                >
                    <div class="button__wrapper">
                        <Button text="Resultado? 👑" :action="getResult" />
                    </div>
                </div>
                <div v-if="nav === 'vote'" class="votes-container">
                    <article
                        v-for="participant in pool.Participants"
                        :key="participant.id"
                        @click="select(participant)"
                        :class="
                            selected?.id === participant.id ? 'selected' : ''
                        "
                    >
                        <user-image
                            :src="participant.user.imageUrl"
                            size="100px"
                        />
                        <h2>
                            {{ participant.user.name }}
                        </h2>
                    </article>
                    <Button
                        text="Votar 👍"
                        @click="postVote()"
                        :loading="loading"
                    />
                </div>
                <div v-else-if="nav === 'info'" class="info-container">
                    <h2 class="label">Nome:</h2>

                    <h1>{{ pool.name }}</h1>

                    <h2 class="label">Descrição:</h2>
                    <h2>
                        {{ pool.desc }}
                    </h2>

                    <div class="divisor"></div>

                    <div class="owner" v-show="isOwner() && !pool.closed">
                        <h1>Ações</h1>
                        <Button
                            text="Adicionar users"
                            icon="person-add-outline"
                            :action="addUsers"
                        />

                        <div class="divisor"></div>

                        <Button text="Fechar Pool 🥳" :action="closePool" />
                        <p>
                            Ao fechar a pool se torna possível visualizar o
                            resultado, porém votos não são mais aceitos.
                            <span
                                >Uma vez fechado, uma pool não pode ser
                                reaberta.</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { api } from "../services/api";
import { useTokenStore } from "../stores/token.store";
import { useUserStore } from "../stores/user.store";
import { buildAuthHeader } from "../utils";
import UserImage from "../components/UserImage.vue";
import SideBar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
import Button from "../components/Button.vue";
import { useToast } from "vue-toastification";

export default {
    name: "Pool Page",
    components: { UserImage, SideBar, Header, Button },
    setup() {
        const token = useTokenStore();
        const user = useUserStore();
        const toast = useToast();

        return {
            token,
            user,
            toast,
        };
    },
    data() {
        return {
            me: undefined,
            pool: undefined,
            nav: "vote",
            selected: null,
            loading: false,
        };
    },
    methods: {
        isOwner() {
            return this.user.normal.id === this.pool.ownerId;
        },
        addUsers() {
            if (this.isOwner()) {
                this.$router.push(`/pool/${this.$route.params.id}`);
            }
        },
        select(participant) {
            this.selected = participant;
        },
        votes() {
            const participants = this.pool?.Participants;
            if (participants === undefined) {
                return 0;
            }
            return participants?.reduce(
                (acc, item) => (item.alreadyVoted ? acc + 1 : acc),
                0
            );
        },
        votesPercentage() {
            const participants = this.pool?.Participants;
            const votes = participants?.reduce(
                (acc, item) => (item.alreadyVoted ? acc + 1 : acc),
                0
            );
            if (votes === undefined) {
                return 0;
            }
            return (votes / participants?.length) * 100;
        },
        async getResult() {
            const config = buildAuthHeader(this.token.withBearer);
            try {
                const [_, result] = await Promise.all([
                    this.fecthAndSetup(),
                    api.get(`/pool/${this.$route.params.id}/result`, config),
                ]);
                this.$router.push({
                    path: `/pool/${this.$route.params.id}/result`,
                });
                console.log(result);
            } catch (err) {
                this.toast.error("Resultado não pode ser computado ainda");
            }
        },
        async closePool() {
            if (!this.isOwner()) return;
            const config = buildAuthHeader(this.token.withBearer);
            try {
                await api.patch(
                    `/pool/${this.$route.params.id}/close`,
                    {},
                    config
                );
                await this.fecthAndSetup();
                this.toast.success("Pool foi fechada!");
                this.nav = "vote";
            } catch (err) {
                console.log(err);
            }
        },
        async fecthAndSetup() {
            const config = buildAuthHeader(this.token.withBearer);
            const result = await api.get(
                `/pool/${this.$route.params.id}`,
                config
            );
            this.me = result.data.Participants.find(
                (item) => item.user.id === this.user.normal.id
            );
            if (!this.me) {
                this.$router.push("/home");
            }
            this.pool = result.data;
            this.$refs.progress.style.setProperty(
                "width",
                `${this.votesPercentage() || 0}%`
            );
            console.log(this.pool);
        },
        async postVote() {
            if (!this.selected) {
                alert("selecione alguém");
                return 0;
            }
            const config = buildAuthHeader(this.token.withBearer);
            const body = {
                votedParticipantId: this.selected.id,
            };
            this.loading = true;
            try {
                await api.post(
                    `/pool/${this.$route.params.id}/vote`,
                    body,
                    config
                );
                await this.fecthAndSetup();
            } catch (err) {
                console.log(err);
                if (err.response.status === 409) {
                    this.toast.error(err.response.data.message);
                    return;
                }
                this.$router.push("/home");
            } finally {
                this.loading = false;
            }
        },
    },
    async mounted() {
        try {
            await this.fecthAndSetup();
        } catch (err) {
            console.log(err);
            this.$router.push("/home");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/partials/poolPage";
</style>
