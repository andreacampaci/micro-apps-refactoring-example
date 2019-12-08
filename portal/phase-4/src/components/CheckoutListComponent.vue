<template>
    <div v-if="hasReady">
        <checkout-list :cart="JSON.stringify($store.getters.cartData)" />
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    import BootstrapVue from 'bootstrap-vue';

    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import { BPagination } from 'bootstrap-vue';
    Vue.use(BootstrapVue);
    Vue.component('b-pagination', BPagination);
    Vue.use(VueAxios, axios);
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import {loadWebComponent} from "@/utils/functions";

    @Component
    export default class CheckoutListComponent extends Vue {
        public hasReady:boolean = false;

        public created() {
            loadWebComponent('http://127.0.0.1:3004/checkout-list.js', this.$store).then(() => {
                this.hasReady = true;
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
</style>
