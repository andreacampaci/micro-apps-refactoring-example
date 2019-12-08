<template>
    <div v-if="hasReady">
        <category-list @selected="selectCategory($event)" />
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
    export default class CategoryListComponent extends Vue {
        public hasReady:boolean = false;

        public created() {
            loadWebComponent('http://127.0.0.1:3002/category-list.js', this.$store).then(() => {
                this.hasReady = true;
            });
        }

        public selectCategory($event: any) {
            this.$store.dispatch('categorySelected', $event.detail)
        }

    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
</style>
