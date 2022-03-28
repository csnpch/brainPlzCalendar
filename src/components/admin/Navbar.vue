<template>
    <button  @click="store.methods.toggleSidebar()">
        <i class="fas fa-bars text-xl cursor-pointer"></i>
    </button>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
</template>

<script>
    import { inject } from 'vue';
    import Button from 'primevue/button';

    export default {
        name: 'navbar_admin',
        components: {
            Button
        },
        setup() {
            const store = inject('store');
            return {
                store
            }
        },
        
    }
</script>