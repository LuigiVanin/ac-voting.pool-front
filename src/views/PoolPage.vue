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
                    <Button text="Votar 👍" @click="postVote()" />
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

export default {
    name: "Pool Page",
    components: { UserImage, SideBar, Header, Button },
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
            me: undefined,
            pool: undefined,
            nav: "vote",
            selected: null,
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
                console.log(result);
            } catch (err) {
                alert("Resultado não pode ser computado ainda");
                console.log(err);
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
                    alert(err.response.data.message);
                    return;
                }
                this.$router.push("/home");
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
@import "../styles/mixins";
@import "../styles/theme";

main {
    background: $background;
    min-height: 100vh;
    padding-top: 70px;

    @include flex($align: start, $gap: 0px);

    .pool {
        width: 62%;
        padding-inline: 20px;
        /* background: blue; */
        padding-bottom: 20px;
        @include flex-center(column);

        h3 {
            font-size: 19px;
            margin-top: 10px;
            font-weight: 400;
            color: $dark-gray;
        }

        nav {
            @include flex(center, space-between, row, 0);
            width: 100%;
            height: 70px;
            box-shadow: 0 3px 15px -5px rgba(0, 0, 0, 0.63);
            background: white;
            margin-top: 15px;
            position: relative;

            &::before {
                transition: 0.2s ease-in-out;
                content: "";
                position: absolute;
                bottom: 0;
                width: 50%;
                height: 4px;
                background: $main-green;
            }

            &.vote::before {
                left: 0;
            }

            &.info::before {
                left: 50%;
            }

            div {
                flex: 1;
                @include flex-center();
                @include title-font();
                font-size: 21px;
                padding-block: 9px;
                cursor: pointer;
                color: $dark-gray;

                &:hover {
                    color: $main-green;
                }

                &:first-child {
                    border-right: 1px solid $divisor-color;
                }
            }
        }

        .wrapper__feed {
            position: relative;
            width: 100%;
            .cover {
                position: absolute;
                inset: 0;
                z-index: 1000;
                background: rgba($color: $background, $alpha: 0.5);
                @include flex-center();

                .button__wrapper {
                    @include flex-center();
                    width: 65%;
                    button {
                        padding-block: 20px;
                    }
                }
            }
        }

        .votes-container {
            width: 100%;
            @include flex(start, center, $gap: 15px);
            flex-wrap: wrap;
            margin-top: 15px;
            margin-bottom: 25px;

            button {
                margin-block: 10px;
                margin-top: 35px;
            }

            article {
                @include flex-center(column);
                width: 120px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &::before {
                    content: "esse?";
                    position: absolute;
                    transition: 0.7s ease-in-out;
                    background: $main-green;
                    opacity: 1;
                    @include title-font();
                    @include flex-center();
                    color: transparent;
                    z-index: 100;
                    border-radius: 50%;
                    width: 0;
                    height: 0;
                    font-weight: bold;
                    font-size: 26px;
                }

                &.selected::before {
                    /* top: -50%;
                    left: -50%; */
                    opacity: 0.8;

                    color: white;
                    width: 150%;
                    height: 150%;
                }

                &:hover {
                    background: rgb(230, 229, 229);
                }

                h2 {
                    text-align: center;
                    width: 100%;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    font-size: 20px;
                }
            }
        }

        h1 {
            @include title-font();
            font-size: 28px;
            margin-block: 15px;
            color: $dark-gray;
            font-weight: 600;
        }

        .progress-bar {
            height: 10px;
            width: 100%;
            border-radius: 5px;
            background: $divisor-color;
            transition: 1s $animation-tf;

            .progress {
                width: 10px;
                height: 10px;
                border-radius: 5px;
                background: $main-green;
            }
        }
    }

    .info-container {
        @include flex(center, start, column, 5px);
        padding-top: 10px;
        padding-inline: 6px;
        width: 100%;

        .owner {
            width: 100%;
            @include flex(center, start, column, 5px);

            button {
                padding-block: 10px;
            }
        }

        h1 {
            font-size: 23px;
            /* margin-top: 25px; */
            margin-block: 0px;
            margin-bottom: 15px;
            width: 100%;
            text-align: center;
        }

        h2.label {
            margin-bottom: 0px;
        }
        h2 {
            width: 100%;
            font-size: 19px;
            text-align: center;
            word-wrap: break-word;
            font-weight: 600;
            color: $soft-gray;
            margin-bottom: 10px;
        }

        p {
            width: 90%;
            text-align: center;
            font-weight: 500;
            font-size: 14px;
            span {
                color: rgb(211, 66, 66);
            }
        }

        .divisor {
            width: 80%;
            height: 1px;
            margin-block: 10px;
            background: $divisor-color;
        }
    }
}

@media (min-width: 980px) {
    main {
        .pool {
            width: 600px;
        }
    }
}

@media (max-width: 600px) {
    main {
        .pool {
            width: 90%;
        }
    }
}

@media (max-width: 350px) {
    main {
        .pool {
            padding-inline: 15admipx;
            width: 100%;
        }
    }
}
</style>
