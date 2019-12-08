<template>
  <div class="VueWrapper">
    <ul class="Categories">
      <li >
        <span class="btn btn-block btn-lg"
          @click="onClick($event, null)"
          :class="{ 'btn-primary': categorySelected === null, 'btn-outline-secondary': categorySelected !== null }">
        Home
        </span>
      </li>
      <li v-for="category in categories">
      <span class="btn btn-block btn-lg"
          @click="onClick($event, category)"
          :class="{ 'btn-primary': categorySelected === category, 'btn-outline-secondary': categorySelected !== category }">
        {{category}}
      </span>
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
    li {
      margin-bottom: 5px;
    }
  }
</style>
