<template>
    <div class="wrapper" @click="goTo()">
        <!-- <ion-icon name="close-outline" /> -->
        <CloseSvg class="icon" />
    </div>
</template>

<script>
import CloseSvg from "../assets/close.svg";

export default {
    name: "Cancel",
    props: {
        to: {
            type: String,
            default: "/home",
        },
    },
    components: {
        CloseSvg,
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

    .icon {
        width: 46px;
        height: 46px;
        fill: $main-green;
    }
}
</style>
