import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import { useTokenStore } from "../stores/token.store";
import CreatePool from "../views/CreatePool.vue";
import AddUsers from "../views/AddUsers.vue";
import PoolPage from "../views/PoolPage.vue";
import Result from "../views/Result.vue";

const signInRouter = {
    path: "/signup",
    name: "sign-up",
    component: SignUp,
};

const signUpRouter = {
    path: "/",
    name: "sign-in",
    component: SignIn,
};

const homeRouter = {
    path: "/home",
    name: "home",
    component: Home,
    beforeEnter(to, from, next) {
        const token = useTokenStore();

        if (!token.isAuth) {
            next("/");
        }
        next();
    },
};

const createPoolRouter = {
    path: "/pool",
    name: "createPool",
    component: CreatePool,
    beforeEnter(to, from, next) {
        const token = useTokenStore();
        if (!token.isAuth) {
            next("/");
        }
        next();
    },
};

const addUserRouter = {
    path: "/pool/:id",
    name: "addUsers",
    component: AddUsers,
    beforeEnter(to, from, next) {
        const token = useTokenStore();

        if (!token.isAuth) {
            next("/");
        }
        next();
    },
};

const poolPageRouter = {
    path: "/pool/:id/room",
    name: "poolPage",
    component: PoolPage,
    beforeEnter(to, from, next) {
        const token = useTokenStore();

        if (!token.isAuth) {
            next("/");
        }
        next();
    },
};

const resultRouter = {
    path: "/pool/:id/result",
    name: "resultPage",
    component: Result,
    beforeEnter(to, from, next) {
        const token = useTokenStore();

        if (!token.isAuth) {
            next("/");
        }
        next();
    },
};

export const routes = [
    signInRouter,
    signUpRouter,
    homeRouter,
    createPoolRouter,
    addUserRouter,
    poolPageRouter,
    resultRouter,
];
