<template>
    <header>
        <div class="wrapper">
            <div class="back" @click="goBack()">
                <ion-icon name="arrow-back-outline" />
            </div>

            <button class="menu" @click="sidebar.toggle()">
                <ion-icon name="menu-outline"></ion-icon>
            </button>
            <h1>voting.pool</h1>
            <button @click="logout()">
                <h2>log.out</h2>
                <ion-icon name="log-out-outline" />
            </button>
        </div>
    </header>
</template>

<script>
import { useSideBarStore } from "../stores/sidebar.store";
import { useUserStore } from "../stores/user.store";
export default {
    name: "Header",
    setup() {
        const sidebar = useSideBarStore();
        const user = useUserStore();

        return {
            user,
            sidebar,
        };
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        logout() {
            this.user.unset();
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../styles/theme";
@import "../styles/mixins";

header {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background: white;
    box-shadow: 0 -1px 6px 0px rgba(0, 0, 0, 0.205);

    /* padding-inline: 25%; */

    .wrapper {
        @include flex($justify: space-between);
        padding-inline: 15px;
        height: 100%;

        h1 {
            @include title-font();
            font-weight: bold;
            font-size: 19px;
            color: $main-green;
        }
    }

    .back {
        width: 125px;
    }

    ion-icon {
        font-size: 26px;
        color: $main-green;
        border-radius: 5px;
        padding: 5px;
        transition: 0.5s ease-in-out;
        --ionicon-stroke-width: 46px;

        &:hover {
            background: rgb(238, 238, 238);
            cursor: pointer;
        }
    }

    button.menu {
        display: none;
    }

    button {
        @include flex-center();
        @include reset();
        border-radius: 5px;
        background: $soft-green;
        width: 125px;
        padding-block: 6px;
        font-size: 19px;
        font-weight: bold;
        color: $dark-gray;
        gap: 5px;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        &:hover {
            background: $main-green;
            color: white;
            ion-icon {
                color: white;
            }
        }

        ion-icon {
            transition: 0.2s ease-in-out;

            font-size: 26px;
            padding: 0px;
            color: $dark-gray;

            &:hover {
                background: transparent;
            }
        }
    }
}

@media (max-width: 600px) {
    header {
        button,
        .back {
            width: 40px;
        }

        button {
            h2 {
                display: none;
            }
        }

        .back {
            display: none;
        }

        button.menu {
            width: 40px;
            @include flex-center();
        }
    }
}
@media (min-width: 980px) {
    header {
        .wrapper {
            width: 980px;
            margin-inline: auto;
        }
    }
}
</style>
