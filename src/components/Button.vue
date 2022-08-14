<template>
    <button :disabled="loading" :style="!style ? {} : style">
        <span v-if="!loading">
            {{ text }}
            <ion-icon v-show="icon" :name="icon" />
        </span>
        <Spinner v-else />
    </button>
</template>

<script>
import Spinner from "./Spinner.vue";

export default {
    name: "Button",
    components: { Spinner },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: "Clique aqui",
        },
        icon: {
            type: String,
            default: undefined,
        },
        style: {
            type: Object,
            default: undefined,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";
@import "../styles/mixins";

button {
    @include reset();
    @include flex(center, center, center, row, 10px);
    width: 80%;
    padding-block: 15px;
    border-radius: 10px;
    font-size: 19px;
    color: $dark-gray;
    cursor: pointer;
    transition: 0.2s cubic-bezier(0.25, 0.75, 0.5, 1.25);
    font-weight: 600;
    background: $soft-green;
    span {
        @include flex(center, center, center, row, 2px);
    }
    &:hover {
        background: $main-green;
        width: 100%;
        color: white;

        ion-icon {
            color: white;
        }
    }

    ion-icon {
        font-size: 28px;
        --ionicon-stroke-width: 46px;
        color: $dark-gray;
    }
}
</style>
