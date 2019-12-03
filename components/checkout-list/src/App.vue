<template>
    <div class="VueWrapper">
        <h1>Your cart</h1>
        <div v-if="itemsListSelected.length > 0">
            <div>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Item</th>
                        <th class="text-right">Price</th>
                        <th class="text-right">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in itemsListSelected" >
                        <td class="text-center ">{{item.count}}</td>
                        <td class="text-left ">{{item.name}}</td>
                        <td class="text-right ">${{item.price}}</td>
                        <td class="text-right ">${{item.price * item.count}}</td>
                        <td><button class="btn btn-sm btn-warning">Remove</button></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">Total:</td>
                        <td class="text-right">
                            ${{total}}
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div>
                <button class="btn btn-md btn-primary">Continue shopping</button>
                <button class="btn btn-md btn-primary">Place older now</button>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-warning">There are no products in your shopping cart. Click here to return to the catalogue</div>
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
        }) private cart!: string;
        public localCart: any[] = [];

        private items: any[] = [];

        public created() {
            this.axios.get('/data/dati')
                .then((response) => {
                    this.items = response.data as any;
                });
        }

        get itemsListSelected() {
            return this.localCart.filter(cartItem => this.items.find(item => item.name === cartItem.name));
        }

        get total() {
            let total = 0;
            for (let i = 0; i < this.localCart.length; i++) {
                total += (this.localCart[i].price * this.localCart[i].count);
            }
            return total;
        }

        @Watch('cart', { immediate: true })
        private onDataChanged(newValue: any) {
            try {
                this.localCart = JSON.parse(newValue);
            } catch (e) {
                this.localCart = [];
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
    .VueWrapper {
        border: 2px dashed #42b983;
        padding: 0.5em;
        font-size: 1em;
    }
    .List {
        &__item {
            margin-bottom: 1em;
        }
    }
</style>
