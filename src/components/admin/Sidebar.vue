<template>
    <Sidebar v-model:visible="store.state.sidebarToggleStatus" position="left">
        Content
        <br>
        <br>
        <router-link to="/" @click="toggleSidebar">
            Home
        </router-link>
        <br>
        <br>
        <router-link to="/login" @click="toggleSidebar">
            Login
        </router-link>
    </Sidebar>
</template>


<script>
    import { inject } from 'vue';
    import Sidebar from 'primevue/sidebar';

    export default {
        name: 'sidebar_admin',
        components: {
            Sidebar,
        },
        setup() {
            const store = inject('store');
            return {
                store
            }
        },
        methods: {
            toggleSidebar() {
                this.store.methods.toggleSidebar();
            }
        },
        created() {
            this.store.methods.getSidebarStatus();
        }
    }
</script>