<template>
    <Header />
    <main>
        <side-bar />
        <div class="pools">
            <Button
                text="Criar Pool"
                icon="add-circle-outline"
                :loading="loading"
                :action="goCreatePool"
            />

            <div class="pools__feed">
                <h2 v-if="pools.length === 0">
                    Você não possui nenhuma pool, que tal criar uma?
                </h2>

                <div class="pools__container" v-else>
                    <Pool
                        v-for="pool in pools"
                        :key="pool.id"
                        @click="toPool(pool.id)"
                        :pool="pool"
                        :userId="user.normal.id"
                    />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { api } from "../services/api";
import { useTokenStore } from "../stores/token.store";
import { buildAuthHeader } from "../utils/index";
import { useUserStore } from "../stores/user.store";
import UserImage from "../components/UserImage.vue";
import Button from "../components/Button.vue";
import Header from "../components/Header.vue";
import SideBar from "../components/SideBar.vue";
import Pool from "../components/Pool.vue";

export default {
    name: "Home",
    components: { UserImage, Button, Header, SideBar, Pool },
    data() {
        return {
            pools: [],
            loading: false,
        };
    },
    setup() {
        const token = useTokenStore();
        const user = useUserStore();
        return {
            token,
            user,
        };
    },
    async mounted() {
        const config = buildAuthHeader(this.token.withBearer);
        this.loading = true;
        try {
            await Promise.all([
                this.fetchPoolsData(config),
                this.fetchUserData(config),
            ]);
        } catch (err) {
            console.log(err);
            this.$router.push("/");
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async goCreatePool() {
            this.loading = true;
            await new Promise((r) => setTimeout(r, 500));
            this.$router.push("/pool");
        },
        async fetchUserData(config) {
            const result = await api.get("user/me", config);
            this.user.set(result.data);
        },
        async fetchPoolsData(config) {
            const result = await api.get("pool", config);
            this.pools = result.data;
        },

        dateFormat(date) {
            if (!date) return "";
            date = new Date(date);
            return [
                this.padTo2Digits(date.getDate()),
                this.padTo2Digits(date.getMonth() + 1),
                date.getFullYear(),
            ].join("/");
        },

        padTo2Digits(num) {
            return num.toString().padStart(2, "0");
        },

        toPool(id) {
            this.$router.push(`/pool/${id}/room`);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";
@import "../styles/mixins";
main {
    background: $background;
    min-height: 100vh;
    padding-top: 70px;
    @include flex($align: start, $gap: 0px);

    /* @import "../styles/partials/userSideBar"; */

    .pools {
        width: 62%;
        padding-inline: 20px;
        /* background: blue; */
        padding-bottom: 20px;
        @include flex-center(column);

        button {
            margin-block: 45px;
        }

        .pools__feed {
            width: 95%;
            border-top: $divisor-setup;
            padding-block: 35px;
            /* background: $main-green; */

            h2 {
                text-align: center;
                font-size: 18px;
                color: $soft-gray;
                font-weight: bold;
            }

            .pools__container {
                @include flex(start, center, column, 25px);
            }
        }
    }
}

@media (min-width: 980px) {
    main {
        .pools {
            width: 600px;
        }
    }
}

@media (max-width: 600px) {
    main {
        .pools {
            width: 90%;
        }
    }
}
</style>
