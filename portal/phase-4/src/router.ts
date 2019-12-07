import Vue from 'vue';
import Router from 'vue-router';
import ItemsListPage from "@/pages/ItemsListPage.vue";
import CheckoutListPage from "@/pages/CheckoutListPage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: ItemsListPage },
    { path: '/checkout-list', component: CheckoutListPage }
  ],
});
