<template>
    <router-view></router-view>
</template>

<script>
    import { provide } from 'vue';
    import store from '@/store';

    export default {
        name: 'App',
        component: {
        },
        provide: {
            store
        },
        setup() {
            provide('store', store);
        },
        created() {
            document.getElementById('app').style.border = 'transparent'
        }
    }
</script>

<style>
    /* Primevue */
    @import './../node_modules/primevue/resources/themes/arya-blue/theme.css';
    @import './../node_modules/primevue/resources/primevue.min.css';
    @import './../node_modules/primeicons/primeicons.css';
    /* Css */
    @import './assets/css/index.css';
    
    body {
        color: rgb(182, 182, 182);
        background: #1e1e1e;
    }

    @media screen and (max-width: 767px) {
        .Toast {
            width: 90% !important;
        }
    }
        
</style>
