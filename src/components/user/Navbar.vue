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
                    
                    <div class="addItems md:hidden">
                        <Button 
                            class="p-button-text relative mt-[0.125rem] -mr-10" 
                            @click="visibleRight = true"
                        >
                            <i class="fas fa-bars icon_color"></i>
                        </Button>
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
                        <Button class="p-button-text relative mt-0.5" @click="toggle">
                            <i class="fas fa-user-circle text-[1.6rem] icon_color"></i>
                        </Button>
                        <TieredMenu ref="menu" :model="items" :popup="true" />
                    </div>
                
                </div>

            </div>
        </div>

        
        <!-- <Sidebar v-model:visible="visibleLeft" class="p-sidebar-sm"></Sidebar>
        <Sidebar v-model:visible="visibleLeft" class="p-sidebar-md"></Sidebar>
        <Sidebar v-model:visible="visibleLeft" class="p-sidebar-lg"></Sidebar> -->

        <div>
            
            <Sidebar class="font_baloo" v-model:visible="visibleRight" :baseZIndex="1000" style="width: 60% !important" position="right">
                <div class="text-center text-xl mt-8">
                    <span>Hello <span class="text-yellow-400">{{ username }}</span></span>
                </div>
                <div class="mt-10">
                    <h3>Menus</h3>
                    
                    <router-link :to="{ name: 'Home' }">
                        <div class="ml-2 mt-2 px-4 pt-3 pb-2 rounded-lg hover:bg-white/10
                            cursor-pointer duration-300
                        ">
                            <button class="text-right">
                                <i class="fas fa-home text-lg mt-2"></i>
                                <span class="ml-2 mt-1">Home</span>
                            </button>
                        </div>
                    </router-link>

                    <router-link :to="{ name: 'Calendar' }">
                        <div class="ml-2 px-4 pt-3 pb-2 rounded-lg hover:bg-white/10
                            cursor-pointer duration-300
                        ">
                            <button class="text-left grid grid-cols-[24px_1fr] items-center">
                                <i class="fas fa-calendar-alt text-lg"></i>
                                <span class="ml-2 mt-1">Calendar</span>
                            </button>
                        </div>
                    </router-link>

                    <router-link :to="{ name: 'Activity' }">
                        <div class="ml-2 px-4 pt-3 pb-2 rounded-lg hover:bg-white/10
                            cursor-pointer duration-300
                        ">
                            <button class="text-left grid grid-cols-[24px_1fr] items-center">
                                <i class="fas fa-plus text-lg"></i>
                                <span class="ml-2 mt-1">Add activity</span>
                            </button>
                        </div>
                    </router-link>

                    <router-link :to="{ name: 'Activity' }">
                        <div class="ml-2 px-4 pt-3 pb-2 rounded-lg hover:bg-white/10
                            cursor-pointer duration-300
                        ">
                            <button class="text-left grid grid-cols-[24px_1fr] items-center">
                                <i class="far fa-list-alt text-lg"></i>
                                <span class="ml-2 mt-1">My activity</span>
                            </button>
                        </div>
                    </router-link>

                    <router-link :to="{ name: 'MainShare' }">
                        <div class="ml-2 px-4 pt-3 pb-2 rounded-lg hover:bg-white/10
                            cursor-pointer duration-300
                        ">
                            <button class="text-left grid grid-cols-[24px_1fr] items-center">
                                <i class="fas fa-share-alt text-lg"></i>
                                <span class="ml-2 mt-1">Attendings</span>
                            </button>
                        </div>
                    </router-link>

                    <router-link :to="{ name: 'Home' }" @click="onLogout()">
                        <div class="ml-2 px-4 pt-3 pb-2 rounded-lg hover:bg-white/10
                            cursor-pointer duration-300
                        ">
                            <button class="text-left grid grid-cols-[24px_1fr] items-center">
                                <i class="fas fa-door-open text-lg"></i>
                                <span class="ml-2 mt-1">Sign out</span>
                            </button>
                        </div>
                    </router-link>

                </div>
            </Sidebar>

        </div>

    </div>
</template>


<script>
    import axios from 'axios';
    import store from '@/store';
    import { provide } from 'vue';

    import Button from 'primevue/button';
    import TieredMenu from 'primevue/tieredmenu';
    import Sidebar from 'primevue/sidebar';

    export default {
        name: 'navbar_user',
        components: {
            Button, TieredMenu, Sidebar
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                username: '',
                items: [],
                visibleRight: false
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
            },
            async onLogout() {
                store.methods.setDataUser(null);
                await axios.post('api/user/logout')
                    .then(res => {
                        this.$router.push({ name: 'Auth' });
                    }).catch(err => {
                        console.log(err);
                    });
            }
        },
        async mounted() {
            this.username = await store.methods.getDataUser().username
            this.username = this.username.charAt(0).toUpperCase() + this.username.slice(1);
            this.items = [
                {
                    label: `${this.username}`,
                    icon: 'fas fa-user',
                    command: () => { /*this.$router.push({ name: 'Profile' });*/ }
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
        },
    }

</script>