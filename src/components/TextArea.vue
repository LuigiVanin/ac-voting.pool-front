<template>
    <textarea
        name=""
        id=""
        cols="30"
        rows="6"
        :placeholder="text"
        v-model="value"
        :required="required"
    ></textarea>
</template>

<script>
export default {
    name: "TextArea",
    props: {
        text: {
            type: String,
            default: "Escreva",
        },
        setter: {
            type: Function,
            default: () => {},
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
        value(newValue, old) {
            this.setter(newValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

@include text-area-placeholder();

textarea {
    width: 100%;
    @include font();
    @include input-default();
    font-size: 21px;
    background: $input-color;
    border: none;
    padding: 20px;
    resize: none;
    outline: none;
}
</style>
