<template>
    <div id="navbar_user" class="w-full">
        <div class="h-full w-full bg-zinc-800 mb:border-b-2 border-b-zinc-700 border-opacity-40">
            <div class="h-full w-full md:w-9/12 grid grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_3fr_1fr] px-2 mx-auto 
                justify-between items-center justify-items-center md:justify-items-center"
            >

                <div class="logo mt-[0.45rem] md:mt-[0.4rem] ml-3 md:ml-2.5 md:col-span-1 text-lg md:text-xl 
                    w-full text-center md:text-left text-violet-300 font_baloo font-semibold
                    tracking-widest md:tracking-[0.2rem] cursor-pointer"
                >
                    <router-link to='/' @click="goTop()">
                        BrainPlz
                    </router-link>
                </div>
                
                <div class="col-start-3 flex justify-end items-center">
                    
                    <router-link to='/' class="hidden md:block" @click="goTop()">
                        <Button class="mt-0.5 p-button-text">
                            <i class="fas fa-home text-xl"
                                :class="{'icon_color': !checkPath('/')}"
                            ></i>
                        </Button>
                    </router-link>
                    
                    <router-link to='/calendar'>
                        <Button class="mt-0.5 p-button-text relative hidden md:block">
                            <i class="fas fa-calendar-alt text-xl"
                                :class="{'icon_color': !checkPath('/calendar')}"
                            ></i>
                            <div class="statusNotiMessage hidden absolute top-1 right-3 p-1 text-sm rounded-full bg-red-400"></div>
                        </Button>
                    </router-link>
                    
                    <div class="addItems md:hidden"
                        :class="{'hidden': !checkPath('/calendar') && !checkPath('/')}"
                    >
                        <router-link :to="{ name: 'AddActivity' }">
                            <Button class="p-button-text relative mt-[0.125rem] -mr-10">
                                <i class="fas fa-plus text-sm icon_color"></i>
                            </Button>
                        </router-link>
                    </div>

                    <div class="addItems hidden md:block">
                        <router-link :to="{ name: 'AddActivity' }">
                            <Button class="p-button-text relative mt-0.5">
                                <i class="fas fa-plus text-[1.35rem]"
                                    :class="{'icon_color': !checkPath('/activity/add') }"
                                ></i>
                            </Button>
                        </router-link>
                    </div>
                    
                    <div class="avatar hidden md:block">
                        <Button class="p-button-text" @click="toggle">
                            <img src="./../../assets/imgs/Avatar.jpg" class="overflow-hidden h-8 rounded-full" style="min-width: 32px">
                        </Button>
                        <TieredMenu ref="menu" :model="items" :popup="true" />
                    </div>
                
                </div>

            </div>
        </div>
    </div>
</template>


<script>
    import axios from 'axios';
    import store from '@/store';
    import { provide } from 'vue';

    import Button from 'primevue/button';
    import TieredMenu from 'primevue/tieredmenu';

    export default {
        name: 'navbar_user',
        components: {
            Button, TieredMenu
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                items: [
                    {
                        label: 'Profile',
                        icon: 'fas fa-user',
                        command: () => { this.$router.push({ name: 'Profile' }); }
                    },
                    {
                        label: 'My activitys',
                        icon: "pi pi-book",
                        command: () => { this.$router.push({ name: 'Activity' }); }
                    },
                    {
                        separator:true
                    },
                    {
                        label: 'Attendings',
                        icon: "fas fa-users",
                        command: () => { this.$router.push({ name: 'MainShare' }); }
                    },
                    {
                        separator:true
                    },
                    {
                        label: 'Sign out', 
                        icon: 'fas fa-sign-out-alt', 
                        command: () => { 
                            store.methods.setDataUser(null);
                            axios.post('api/user/logout')
                                .then(res => {
                                    this.$router.push({ name: 'Auth' });
                                }).catch(err => {
                                    console.log(err);
                                });
                        }
                    }
                    
                ]
            }
        },
        methods: {
            toggle(event) {
                this.$refs.menu.toggle(event);
            },
            goTop() {
                try {
                    window.scrollTo(0, 0);
                } catch (error) {
                    error;
                }
            },
            checkPath(path) {
                return this.$route.path === path;
            }
        }
    }

</script>