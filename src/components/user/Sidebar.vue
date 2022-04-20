<template>
    <div>
    <!-- <Sidebar v-model:visible="visibleLeft">
        Content
    </Sidebar> -->
    </div>
</template>

<script>
    import Sidebar from 'primevue/sidebar';

    export default {
        name: 'Sidebar',
        components: {
            Sidebar
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visibleLeft: false,
            }
        },
        methods: {
            toggle(event) {
                this.visibleLeft = !this.visibleLeft;
            }
        }
    }
</script>