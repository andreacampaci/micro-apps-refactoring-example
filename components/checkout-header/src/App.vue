<template>
  <div class="VueWrapper">
    <span class="paddingStyle">Your cart:{{itemCount}} item(s), ${{total}}</span>
    <button @click="checkout($event)" class="btn btn-md btn-light">Checkout</button>
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

    get total() {
      let total = 0;
      for (let i = 0; i < this.localCart.length; i++) {
        total += (this.localCart[i].price * this.localCart[i].count);
      }
      return total;
    }
    get itemCount() {
      let total = 0;
      for (let i = 0; i < this.localCart.length; i++) {
        total += this.localCart[i].count;
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

    public checkout($event: any) {
      $event.target.dispatchEvent(new CustomEvent('checkout', {
        bubbles: true,
        detail: 'checkout',
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
    font-size: 16px;
  }
  .paddingStyle {
    margin-right: 0.5em;
    color: #777;
  }
</style>
