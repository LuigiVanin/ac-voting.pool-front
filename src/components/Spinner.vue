<template>
    <span v-show="toggle"> </span>
</template>

<script>
export default {
    name: "spinner",
    props: {
        toggle: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";

@include spinner();
</style>
