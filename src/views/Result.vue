<template>
    <main>
        <div class="icon">
            <CloseSvg @click="back()" />
        </div>
        <Spinner v-if="!pool" />

        <h1 v-else>
            Vencedor da pool <span>{{ pool.name }}</span>
        </h1>

        <h1 class="error" v-if="!winner && pool !== undefined">😨</h1>

        <article v-if="!!winner">
            <!-- v-for="(user, index) in participants.sort((a, b) =>
                a._count.voted < b._count.voted ? 1 : -1
            )"
            :key="user.id" -->
            <div class="wrapper">
                <!-- <span v-show="index === 0">👑</span> -->
                <span>👑</span>

                <UserImage
                    :src="winner.user.imageUrl"
                    :size="!!winner ? '150px' : '110px'"
                />
                <h2>{{ winner.user.name }}</h2>
            </div>

            <h2 :class="!winner === 0 ? 'winner' : ''">
                votes: <span>{{ winner._count.voted }}</span>
            </h2>
        </article>
    </main>
</template>

<script>
import { useTokenStore } from "../stores/token.store";
import Spinner from "../components/Spinner.vue";
import CloseSvg from "../assets/close-sharp.svg";
import UserImage from "../components/UserImage.vue";
import { useResult } from "../stores/result.store";

export default {
    name: "Result",
    components: {
        Spinner,
        CloseSvg,
        UserImage,
    },
    setup() {
        const token = useTokenStore();
        const result = useResult();
        return {
            token,
            result,
        };
    },
    data() {
        return {
            pool: undefined,
            winner: undefined,
        };
    },
    methods: {
        back() {
            this.$router.back();
        },
    },
    mounted() {
        console.log(this.result.poolResult.length);
        console.log(this.result.poolData);
        if (!this.result.poolResult.length) {
            this.back();
        }
        this.pool = this.result.poolData;
        this.winner = this.result.poolResult[0];
        console.log("winner: ", this.winner);
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/partials/result";
</style>
