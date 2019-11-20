<template>
  <div class="VueWrapper">
    <ul class="Categories">
      <li class="Categories__item"
          @click="onClick($event, null)"
          :class="{ 'Categories__active': categorySelected === null }">
        Home
      </li>
      <li v-for="category in categories"
          class="Categories__item"
          @click="onClick($event, category)"
          :class="{ 'Categories__active': categorySelected === category }">
        {{category}}
      </li>
    </ul>
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
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    public categories: any[] = [];
    public categorySelected: string | null = null;

    public created() {
      this.axios.get('/data/dati')
              .then((response: { data: any[] }) => {
                this.categories = [...new Set(response.data.map(item => item.category))];
              });
    }

    public onClick(event: any, categorySelected: string) {
      this.categorySelected = categorySelected;
      event.target.dispatchEvent(new CustomEvent('selected', {
        bubbles: true,
        detail: categorySelected,
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

  .Categories {
    font-size: 0.8em;
    padding: 0;
    margin: 0;
    &__item {
      text-align: center;
      cursor: pointer;
      padding: 0.2em;
      margin-bottom: 0.2em;
      list-style: none;
      background: #FFF;
      border: 1px solid #666;
      border-radius: 10px;
      font-weight: bold;
      color: #666;
      &:hover {
        color: #FFF;
        background: #666;
        border: 1px solid #666;
      }
    }
    &__active {
      color: #FFF;
      background: #007bff;
      border: 1px solid #007bff;
      &:hover {
        color: #FFF;
        background: #007bff;
        border: 1px solid #007bff;
      }
    }
  }
</style>
