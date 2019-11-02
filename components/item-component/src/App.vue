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
                            <b-badge variant="primary">{{item.price}}</b-badge>
                        </h3>
                        <b-button variant="success" @click="addCart()">Add to Cart</b-button>
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
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import {
        BPagination,
    } from 'bootstrap-vue';

    @Component({
        components: {
            'b-pagination': BPagination,
        },
    })
    export default class App extends Vue {
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
            return this.items.slice((this.currentPage - 1) * this.perPage, (this.currentPage) * this.perPage);
        }

        get rows() {
            return this.items.length;
        }

        public addCart(event: any) {
            event.target.dispatchEvent(new CustomEvent('my-click', {
                bubbles: true,
                detail: 'clicked',
                composed: true,
            }));
        }
    }
</script>

<style lang="scss" scoped>
    .List {
        &__item {
            margin-bottom: 1em;
        }
    }
</style>
