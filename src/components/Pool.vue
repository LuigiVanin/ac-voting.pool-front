<template>
    <article>
        <span v-show="pool.ownerId === userId">👑</span>
        <h1>
            {{ pool.name }}
        </h1>
        <h2>
            participantes: <span> {{ pool.Participants.length }} </span>
        </h2>
        <h2>
            status: <span>{{ pool.closed ? "fechado 👍" : "aberto 👋" }}</span>
        </h2>
    </article>
</template>

<script>
export default {
    name: "Pool",
    props: {
        pool: {
            type: Object,
            default: undefined,
        },
        userId: {
            type: Number,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/mixins";
@import "../styles/theme";

article {
    width: 100%;
    background: $main-green;
    /* background: rgb(29, 201, 85); */
    padding: 20px;
    padding-right: 40px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    gap: 7px;

    transition: all 1s $animation-tf;
    box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.541);
    cursor: pointer;
    position: relative;
    border-radius: 15px;
    min-height: 135px;
    font-size: 23px;
    color: white;
    @include title-font();
    font-weight: 700;

    h1 {
        font-size: 25px;
    }

    h2 {
        font-size: 18px;
        font-weight: 500;
        color: rgb(255, 255, 255);
        span {
            width: auto;
            height: auto;
            background: transparent;
            position: relative;
            right: 0;
            top: 0;
            font-weight: 700;
            font-size: 21px;
        }
    }

    span {
        position: absolute;
        font-size: 26px;
        border-radius: 50%;
        right: 10px;
        top: 10px;
    }
    background: linear-gradient(
        220deg,
        hsl(156deg 100% 35%) 0%,
        hsl(154deg 100% 36%) 19%,
        hsl(152deg 100% 37%) 32%,
        hsl(151deg 100% 38%) 43%,
        hsl(149deg 100% 39%) 54%,
        hsl(147deg 100% 40%) 64%,
        hsl(145deg 100% 41%) 73%,
        hsl(142deg 100% 42%) 82%,
        hsl(137deg 86% 47%) 91%,
        hsl(131deg 78% 51%) 100%
    );

    &:hover {
        box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.315);
    }
}
</style>
