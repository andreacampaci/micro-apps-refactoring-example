<template>
    <div class="VueWrapper">
        <div class="Application">
            <div class="Header">
                <div class="Header__logo">
                    <h4>SPORTS STORE</h4>
                </div>
                <div class="Header__nav">
                    <div class="Header__navItems">
                        <checkout-header-component></checkout-header-component>
                        <a class="btn btn-primary" @click="$router.push('/')">Back</a>
                    </div>
                </div>
            </div>
            <router-view></router-view>
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
    import CheckoutHeaderComponent from "@/components/CheckoutHeaderComponent.vue";

    @Component({
        components: {
            CheckoutHeaderComponent
        }
    })
    export default class App extends Vue {

    }
</script>

<style lang="scss" scoped>
    @import 'node_modules/bootstrap/dist/css/bootstrap';
    @import 'node_modules/bootstrap-vue/dist/bootstrap-vue';
    .VueWrapper {
        border: 2px dashed #42b983;
        padding: 0.5em;
        margin: 0.5em;
        font-size: 1.5em;
    }

    .Application {
        max-width: 936px;
        margin: 0 auto;
    }

    .Header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        background: #333;
        padding: 0.5em;
        border-radius: 4px;
        align-items: center;
        margin-bottom: 0.5em;
        &__logo {
            color: #666;
            h4 {
                margin: 0;
            }
        }
        &__nav {
            &Items {
                display: flex;
                flex-direction: row;
                justify-items: center;
                align-items: center;
                &>div, &>a{
                    margin-left: 0.5em;

                }
            }
            a {
                color: white !important;
            }
        }
    }
</style>
