<template>
    <button
        :disabled="loading"
        :class="loading ? 'toggle' : ''"
        :style="!style ? {} : style"
        @click="test()"
    >
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
        action: {
            type: Function,
            default: () => {},
        },
    },
    methods: {
        test() {
            console.log("Jeed");
            this.action();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";
@import "../styles/mixins";

button.toggle {
    background: $main-green;
    width: 100%;
    color: white;

    ion-icon {
        color: white;
    }
}

button {
    @include reset();
    @include flex(center, center, row, 10px);
    width: 85%;
    padding-block: 15px;
    border-radius: 10px;
    font-size: 19px;
    color: $dark-gray;
    cursor: pointer;
    transition: 0.2s $animation-tf;
    font-weight: 600;
    background: $soft-green;
    span {
        @include flex(center, center, row, 2px);
    }
    &:hover
    /*. &.toggle  */ {
        background: $main-green;
        width: 100%;
        color: white;

        ion-icon {
            color: white;
        }
    }

    ion-icon {
        font-size: 26px;
        padding-left: 5px;
        --ionicon-stroke-width: 46px;
        color: $dark-gray;
    }
}
</style>
