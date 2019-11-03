<template>
    <div class="VueWrapper">
        <div class="List">
            <b-card class="List__item" v-for="item in itemsPaginated">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h3><b>{{item.name}}</b></h3>
                        <h6>{{item.description}}</h6>
                    </div>
                    <div>
                        <h3>
                            <b-badge variant="primary">${{item.price}}</b-badge>
                        </h3>
                        <b-button variant="success" @click="addCart($event, item)">Add to Cart</b-button>
                    </div>
                </div>
            </b-card>
            <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
            ></b-pagination>
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

    @Component
    export default class App extends Vue {

        @Prop({
            default: () => {
                return "";
            }
        }) private category!: string;
        public currentPage = 1;
        public perPage = 3;
        private items: any[] = [];

        public created() {
            this.axios.get('/data/dati')
                .then((response) => {
                    this.items = response.data as any;
                });
        }

        get itemsPaginated() {
            if (this.category !== "") {
                return this.items
                    .filter(item => item.category === this.category)
                    .slice((this.currentPage - 1) * this.perPage, (this.currentPage) * this.perPage);
            }
            return this.items
                .slice((this.currentPage - 1) * this.perPage, (this.currentPage) * this.perPage);
        }

        get rows() {
            if (this.category !== "") {
                return this.items
                    .filter(item => item.category === this.category)
                    .length;
            }
            return this.items.length;
        }

        public addCart($event: any, item: any) {
            $event.target.dispatchEvent(new CustomEvent('addcart', {
                bubbles: true,
                detail: item,
                composed: true,
            }));
        }
    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
    .VueWrapper {
        border: 2px dashed #42b983;
        padding: 0.5em;
        font-size: 1.5em;
    }
    .List {
        &__item {
            margin-bottom: 1em;
        }
    }
</style>
