<template>
    <main>
        <div class="icon">
            <CloseSvg @click="back()" />
        </div>
        <Spinner v-if="!pool" />

        <h1 v-else>
            Vencedor da pool <span>{{ pool.name }}</span>
        </h1>

        <h1 class="error" v-if="!result.length && pool !== undefined">😨</h1>

        <article
            v-for="(user, index) in result.sort((a, b) =>
                a._count.voted < b._count.voted ? 1 : -1
            )"
            :key="user.id"
        >
            <div class="wrapper">
                <span v-show="index === 0">👑</span>
                <UserImage
                    :src="user.user.imageUrl"
                    :size="index === 0 ? '150px' : '110px'"
                />
                <h2>{{ user.user.name }}</h2>
            </div>

            <h2 :class="index === 0 ? 'winner' : ''">
                votes: <span>{{ user._count.voted }}</span>
            </h2>
        </article>
    </main>
</template>

<script>
import { useTokenStore } from "../stores/token.store";
import { buildAuthHeader } from "../utils";
import { api } from "../services/api";
import Spinner from "../components/Spinner.vue";
import CloseSvg from "../assets/close-sharp.svg";
import UserImage from "../components/UserImage.vue";

export default {
    name: "Result",
    components: {
        Spinner,
        CloseSvg,
        UserImage,
    },
    setup() {
        const token = useTokenStore();
        return {
            token,
        };
    },
    data() {
        return {
            pool: undefined,
            result: [],
        };
    },
    methods: {
        back() {
            this.$router.back();
        },
        async getResult() {
            const config = buildAuthHeader(this.token.withBearer);
            try {
                const [_, result] = await Promise.all([
                    this.fecthAndSetup(),
                    api.get(`/pool/${this.$route.params.id}/result`, config),
                ]);
                console.log(result);
                this.$router.push({
                    path: `/pool/${this.$route.params.id}/result`,
                });
                this.result = result.data;
            } catch (err) {
                alert("Resultado não pode ser computado ainda");
                this.$router.back();
                console.log(err);
            }
        },
        async fecthAndSetup() {
            const config = buildAuthHeader(this.token.withBearer);
            const result = await api.get(
                `/pool/${this.$route.params.id}`,
                config
            );
            this.pool = result.data;
            console.log(this.pool);
        },
    },
    async mounted() {
        this.getResult();
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

main {
    width: 100%;
    min-height: 100vh;
    background: $main-green;
    position: relative;
    padding-top: 30px;
    @include flex-center($direction: column, $gap: 25px);

    article {
        @include flex-center($gap: 20px);
        h2 {
            @include title-font();
            font-weight: bold;
            color: white;
            font-size: 23px;
            span {
                font-size: 36px;
            }
            &.winner {
                text-decoration: underline;
                font-weight: 1000;

                font-size: 26px;
            }
        }
    }
    .wrapper {
        position: relative;
        h2 {
            text-align: center;
            width: 110px;
        }
        span {
            position: absolute;
            right: -10px;
            top: -10px;
            font-size: 46px;
            z-index: 1000;
            transform: rotate(35deg);
        }
    }

    .error {
        margin-block: 15px;
    }

    .icon {
        fill: white;
        width: 50px;
        height: 50px;
        padding: 5px;
        position: fixed;
        left: 10px;
        top: 10px;
        border-radius: 10px;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        &:hover {
            background: white;
            fill: $main-green;
        }
    }

    h1 {
        @include title-font();
        font-weight: bold;
        color: white;
        font-size: 32px;
        text-align: center;
        width: 80%;
        span {
            text-transform: capitalize;
            font-size: 45px;
            font-weight: 900;
            word-wrap: break-word;
        }
    }
}
</style>
