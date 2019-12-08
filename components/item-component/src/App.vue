<template>
    <div class="VueWrapper">
        <div class="List">
            <b-card class="List__item" v-for="item in itemsPaginated">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h4><b>{{item.name}}</b></h4>
                        <h6>{{item.description}}</h6>
                    </div>
                    <div>
                        <h5 class="d-flex justify-content-end"><span class="badge badge-primary ">${{item.price}}</span></h5>
                        <button @click="addCart($event, item)" class="btn btn-success btn-sm">Add to Cart</button>
                    </div>
                </div>
            </b-card>
            <nav aria-label="Page navigation example" class="d-flex justify-content-end">
                <ul class="pagination">
                    <li class="page-item" v-if="currentPage > 1">
                        <button class="page-link" @click="prevNav()">Previous</button>
                    </li>
                    <li class="page-item"  v-for="index in rows/perPage" :key="index">
                        <button class="page-link" @click="navTo(index)">{{index}}</button>
                    </li>
                    <li class="page-item" v-if="currentPage < rows/perPage">
                        <button class="page-link" @click="nextNav()">Next</button>
                    </li>
                </ul>
            </nav>
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

        public prevNav() {
            this.currentPage--;
        }

        public navTo(index) {
            this.currentPage = index;
        }

        public nextNav() {
            this.currentPage++;
        }
    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
    .VueWrapper {
        border: 2px dashed #42b983;
        padding: 0.5em;
        font-size: 12px;
    }
    .List {
        &__item {
            margin-bottom: 1em;
        }
    }
</style>
