<template>
    <div class="ItemsList">
        <div class="ItemsList__sidebar">
            <category-list-component></category-list-component>
        </div>
        <div class="ItemsList__content">
            <items-list-component></items-list-component>
        </div>
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
    import CategoryListComponent from "@/components/CategoryListComponent.vue";
    import ItemsListComponent from "@/components/ItemsListComponent.vue";

    @Component({
        components: {
            CategoryListComponent,
            ItemsListComponent
        }
    })
    export default class ItemsListPage extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';

    .ItemsList {
        display: flex;
        flex-direction: row;
        &__sidebar {
            max-width: 250px;
        }
        &__content {
            flex-grow: 1;
        }
    }
</style>
