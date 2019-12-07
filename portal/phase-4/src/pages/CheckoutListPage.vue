<template>
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

    @Component
    export default class CheckoutListPage extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
</style>
