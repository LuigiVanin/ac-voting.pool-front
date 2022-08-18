<template>
    <div class="wrapper" @click="goTo()">
        <ion-icon name="close-outline" />
    </div>
</template>

<script>
export default {
    name: "Cancel",
    props: {
        to: {
            type: String,
            default: "/home",
        },
    },
    methods: {
        goTo() {
            this.$router.push("/home");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";

.wrapper {
    position: absolute;
    top: 8px;
    left: calc(50% - 45%);
    cursor: pointer;

    ion-icon {
        font-size: 46px;
        color: $main-green;
        --ionicon-stroke-width: 56px;
    }
}
</style>
