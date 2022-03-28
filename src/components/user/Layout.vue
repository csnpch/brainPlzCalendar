<template>
    <div id="layout_user" 
        class="relative h-screen grid md:grid-rows-[52px_1fr]
            grid-rows-[46px_1fr_46px] overflow-hidden"
    >
        <Navbar class="z-20" />
        
        <div id="slot_layout" class="mt-5 md:mt-7 overflow-y-scroll overflow-x-hidden">
            <ScrollPanel style="width: 100%; height: 100%"
                :class="{'custom': visibleScroll}">
                <slot></slot>
            </ScrollPanel>
        </div>
        <Footer class="z-20 md:hidden" />
    </div>
</template>

<script>
    import Navbar from './Navbar.vue';
    import Footer from './Footer.vue';

    import ScrollPanel from 'primevue/scrollpanel';

    export default {
        name: 'layout_user',
        components: {
            Navbar, Footer,
            ScrollPanel
        },
        props: {
            visibleScroll: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // checkSmallDevice() {
                // if (window.innerWidth < 768) {
                    // return true;
                // }
                // return false;
            // }
        },
        mounted() {
            // this.checkSmallDevice();
            // window.addEventListener('resize', () => {
            //     this.checkSmallDevice();
            // });
        },
    }
</script>

<style scoped>
    .custom .p-scrollpanel-bar {
        width: 0px !important;
        background-color: transparent !important;
    }
</style>