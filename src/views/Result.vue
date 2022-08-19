<template>teste</template>

<script>
import { useTokenStore } from "../stores/token.store";
import { buildAuthHeader } from "../utils";

export default {
    name: "Result",
    props: {},
    setup() {
        const token = useTokenStore();
        return {
            token,
        };
    },
    data() {
        return {
            pool: undefined,
        };
    },
    methods: {
        async getResult() {
            const config = buildAuthHeader(this.token.withBearer);
            try {
                const [_, result] = await Promise.all([
                    this.fecthAndSetup(),
                    api.get(`/pool/${this.$route.params.id}/result`, config),
                ]);
                console.log(result);
                this.$router.push({
                    path: `/pool/${this.$route.params.id}/result`,
                });
                console.log(result);
            } catch (err) {
                alert("Resultado não pode ser computado ainda");
                console.log(err);
            }
        },
        async fecthAndSetup() {
            const config = buildAuthHeader(this.token.withBearer);
            const result = await api.get(
                `/pool/${this.$route.params.id}`,
                config
            );
            this.pool = result.data;
            console.log(this.pool);
        },
    },
    mounted() {
        // console.log(this.id);
    },
};
</script>

<style lang="scss" scoped></style>
