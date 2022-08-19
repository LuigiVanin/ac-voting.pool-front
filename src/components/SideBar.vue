<template>
    <aside :class="defineSideBarState()">
        <div class="close" @click="sidebar.off()">
            <ion-icon name="close-outline" />
        </div>
        <UserImage :src="user.normal?.imageUrl" size="125px" />
        <div class="info">
            <h1 class="title">Profile</h1>

            <h1>{{ user.normal?.name }}</h1>
            <h2 class="email">{{ user.normal?.email }}</h2>
            <h2 class="date">
                entrou: {{ datetimeFormat(user.normal?.createdAt) }}
            </h2>
        </div>

        <button @click="goBack()">
            <ion-icon name="arrow-back-outline" />
            Voltar
        </button>
    </aside>
</template>

<script>
import UserImage from "../components/UserImage.vue";
import { useUserStore } from "../stores/user.store";
import { dateFormat } from "../utils/index";
import { useSideBarStore } from "../stores/sidebar.store";

export default {
    name: "SideBar",
    components: {
        UserImage,
    },
    setup() {
        const user = useUserStore();
        const sidebar = useSideBarStore();

        return {
            user,
            sidebar,
        };
    },
    methods: {
        datetimeFormat(date) {
            return dateFormat(date);
        },
        defineSideBarState() {
            return this.sidebar.value ? "on" : "off";
        },
        goBack() {
            this.sidebar.off();
            this.$router.back();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/partials/userSideBar";
</style>
