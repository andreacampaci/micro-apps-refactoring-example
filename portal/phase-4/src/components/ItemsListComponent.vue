<template>
    <div v-if="hasReady">
        <item-component :category="$store.getters.categorySelected" @addcart="addProductToCart($event)"/>
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
    export default class ItemsListComponent extends Vue {
        public hasReady:boolean = false;

        public created() {
            loadWebComponent('http://127.0.0.1:3001/item-component.js', this.$store).then(() => {
                this.hasReady = true;
            });
        }

        public addProductToCart($event: any) {
            this.$store.dispatch('cartData', $event.detail)
        }
    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
</style>
