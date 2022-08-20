<template>
    <div
        class="image-wrapper"
        :style="{
            height: size,
            width: size,
        }"
    >
        <div
            class="image-background"
            :style="{
                backgroundImage: `url(${src})`,
                height: size,
                width: size,
            }"
        ></div>
    </div>
</template>

<script>
export default {
    name: "UserImage",
    props: {
        size: {
            type: String,
            default: "85px",
        },
        src: {
            type: String,
            default: "",
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";

.image-wrapper {
    position: relative;
    margin: 5px;
    .image-background {
        /* background: rgb(207, 207, 207); */
        background-position: center;
        background-size: cover;
        border-radius: 15px;
        border: 7px solid $soft-green;

        box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 0.349);

        position: relative;
        z-index: 20;

        &:hover {
            box-shadow: 0px 0px 15px 0px $main-green;
        }
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-position: center;
        background-size: cover;
        border-radius: 15px;
        background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E");
        z-index: 1;
    }
}
</style>
