<template>
    <div
        :class="{'w-full flex justify-center': onJoined}">
        <div v-if="onJoined" class="w-11/12 sm:w-7/12 xl:w-4/12 mt-20">
            <AttendingJoin 
                v-if="statusFound && onJoined" 
                @tryAgain="goMain"
                @onJoin="onJoinShare($event)"
                :data="dataInvite"
                class="w-full smoothShow" 
            />
            <NotFoundInvite 
                v-if="!statusFound && onJoined" 
                @tryAgain="goMain" 
                class="w-full smoothShow" 
            />
        </div>

        <Layout v-if="!onJoined">
            <div class="smoothShow w-full flex justify-center">
                <div class="w-11/12 sm:w-10/12 md:w-6/12 xl:w-4/12 flex flex-col justify-center gap-4 md:gap-6">
                    
                    <AttendingList />

                    <div class="h-min font_itim text-white bg-[#2C2C2C] p-6 rounded-2xl">
                        <div class="mb-4 mx-2 -mt-1.5 flex flex-row justify-between items-end">
                            <p class="tracking-wider text-lg">
                                Paste code or URL invite.
                            </p>
                            <p 
                                v-if="validate.invite.status"
                                class="text-red-300"
                            >
                                {{ validate.invite.msg }}
                            </p>
                        </div>
                        <input 
                            v-model="codeOrUrlInvite"
                            type="text" 
                            placeholder="www.brain_plz.com/share/########"
                            class="w-full py-3.5 px-5 rounded-lg bg-[#474747] focus:outline-sky-400"
                            @keyup="validateInput()"
                        >
                    </div>
                    <div class="-mt-1 md:-mt-3 grid grid-cols-2 h-10 gap-3 font_itim text-white">
                        <router-link to="/share/create">
                            <button 
                                class="
                                    w-full h-full font_baloo font-semibold tracking-wider
                                    bg-[#313964] hover:bg-[#2c3258] duration-200 rounded-xl text-sm
                                "
                            >
                                Create my invite
                            </button>
                        </router-link>
                        <button 
                            @click="checkCodeInvite"
                            class="
                                font_baloo font-semibold tracking-wider bg-[#5C2D8A] 
                                hover:bg-[#502779] duration-200 rounded-xl text-sm
                            "
                        >
                            Join
                        </button>
                    </div>

                </div>
            </div>
        
        </Layout>

        <Toast position="top-right" class="Toast" />

    </div>
</template>

<script>

    import { provide } from 'vue';
    import store from '@/store';
    import axios from 'axios';

    import Layout from '@/components/user/Layout';
    import AttendingList from '@/components/attending/List';
    import AttendingJoin from '@/components/attending/Join';
    import NotFoundInvite from '@/components/attending/NotFoundInvite';

    import Toast from 'primevue/toast';

    export default {
        name: 'ShareAndJoin',
        components: {
            Layout, AttendingList, Toast,
            AttendingJoin, NotFoundInvite
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                onJoined: false,
                statusFound: false,
                codeOrUrlInvite: null,
                dataInvite: null,
                validate: {
                    invite: { msg: '', status: false },
                },
            }
        },
        methods: {
            goMain() {
                this.onJoined = false;
                this.codeOrUrlInvite = null;
            },
            
            validateInput() {
                if (this.codeOrUrlInvite === '' || this.codeOrUrlInvite === null) {
                    this.validate.invite.msg = 'Please enter the code or URL invite.';
                    this.validate.invite.status = !false;
                } else {
                    this.validate.invite.msg = '';
                    this.validate.invite.status = !true;
                }

                return !this.validate.invite.status;
            },
            
            async checkCodeInvite() {
                
                if (this.validateInput()) {
                    await axios.get(`/api/share/find/invite/${this.codeOrUrlInvite}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.onJoined = true;
                            if (res.data !== null) {
                                this.statusFound = true;
                                this.dataInvite = res.data;
                            }
                        }
                    }).catch(err => { err });
                }
            
            },

            async onJoinShare(val) {
                await axios.post(`/api/share/join/${val.public_key}/${val.creator}`)
                    .then(async (res) => {
                        if (res.status === 200) {
                            if (res.data.statusJoin) {
                                this.$toast.add({
                                    severity:'success', 
                                    summary: 'Join attending success', 
                                    detail:'', 
                                    life: 1300
                                });
                                this.codeOrUrlInvite = null;
                                setTimeout(() => {
                                    this.onJoined = false;
                                }, 600);
                                await store.methods.getDataUserOnDb();
                                await store.methods.getDataSharing();
                            } else {
                                console.log('Not working');
                                this.$toast.add({
                                    severity:'warn', 
                                    summary: 'Cannot join your own attending.', 
                                    detail:'', 
                                    life: 2000
                                });
                            }
                        }
                    }).catch(err => { err; this.onJoined = false; });
            }
        },
        async mounted() {
            document.title = 'Share | BrainPlz';
        }
    }
</script>
