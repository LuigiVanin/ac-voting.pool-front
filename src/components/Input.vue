<template>
    <div class="input-wrapper">
        <input
            :type="type"
            v-model="value"
            :placeholder="placeholder"
            :required="required"
        />
        <ion-icon v-show="icon" :name="icon" />
    </div>
</template>

<script>
export default {
    name: "custom-input",
    props: {
        placeholder: {
            type: String,
            default: "Escreva...",
        },
        setter: {
            type: Function,
            required: true,
        },
        icon: {
            type: String,
            default: undefined,
        },
        type: {
            type: String,
            default: "text",
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            value: "",
        };
    },
    watch: {
        value(newValue, _) {
            this.setter(newValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

.input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    @include input-default();

    input {
        @include font();
        color: $dark-gray;
        width: 100%;

        background: transparent;
        flex: 1;
        outline: none;
        border: none;
        color: rgb(17, 17, 17);
        padding-inline: 20px;
        padding-block: 15px;
        font-size: 21px;
        line-height: 0px;
    }

    ion-icon {
        font-size: 25px;
        padding-inline: 10px;
        padding-block: 2px;
        border-left: 1px solid $dark-gray;
        color: $dark-gray;
    }
}
</style>
