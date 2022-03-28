<template>
    <footer class="w-full bg-zinc-900">
        <div class="grid grid-cols-3 items-center justify-items-center">
            <router-link to='/' class="">
                <Button class="p-button-text">
                    <i class="fas fa-home text-xl"
                        :class="{'icon_color': !checkPath('/')}"
                    ></i>
                </Button>
            </router-link>
            <router-link to='/calendar' class="">
                <Button class="relative p-button-text" style="height: 100% important">
                    <i class="fas fa-calendar-alt text-xl"
                        :class="{'icon_color': !checkPath('/calendar')}"
                    ></i>
                </Button>
            </router-link>
            <div class="avatar">
                <Button class="p-button-text">
                    <img src="./../../assets/imgs/Avatar.jpg" class="overflow-hidden h-7 rounded-full">
                </Button>
            </div>
            
        </div>
    </footer>
</template>

<script>
    import Button from 'primevue/button';

    export default {
        name: 'navbar_user',
        components: {
            Button,
        },
        methods: {
            // check path route
            checkPath(path) {
                if (this.$route.path === path) {
                    return true;
                }
                return false;
            },  
        },
    }
</script>
