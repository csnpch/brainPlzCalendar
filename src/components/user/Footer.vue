<template>
    <footer class="w-full bg-zinc-900">
        <div class="grid grid-cols-2 items-center justify-items-center mt-3">
            <router-link to='/' class="">
                <button class="btn-color">
                    <i class="fas fa-home text-xl"
                        :class="{'icon_color': !checkPath('/')}"
                    ></i>
                </button>
            </router-link>
            <router-link to='/calendar' class="">
                <button class="btn-color" style="height: 100% important">
                    <i class="fas fa-calendar-alt text-xl"
                        :class="{'icon_color': !checkPath('/calendar')}"
                    ></i>
                </button>
            </router-link>
            <!-- <div class="avatar">
                <Button class="p-button-text relative mt-0.5">
                    <i class="fas fa-user-circle text-[1.6rem] icon_color"></i>
                </Button>
            </div> -->
            
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


<style scoped>
    .btn-color {
        color: rgb(64, 172, 255);
    }
</style>