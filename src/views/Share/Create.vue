<template>
    <Layout>
        <div class="smoothShow w-full flex flex-col gap-6 items-center justify-center">
            
            <div 
                :class="{'hidden': stepGenerate !== 1}"
                class="w-11/12 sm:w-10/12 md:w-6/12 xl:w-4/12 flex flex-col justify-center gap-3"
            >
                <div class="h-min font_itim text-white bg-[#2C2C2C] p-6 pt-8 rounded-2xl">
                    <p class="mb-4 ml-2 -mt-1.5 tracking-wider">
                        Sharing group name <span class="text-red-300">*</span>
                    </p>
                    <input 
                        type="text" 
                        v-model="groupName"
                        placeholder="Sharing group name"
                        class="w-full py-3.5 px-5 rounded-lg bg-[#474747]"
                        :class="{'border-2 border-red-500 border-opacity-60': validate.groupName.status}"
                    >
                    <p class="mt-6 mb-4 ml-2 tracking-wider">
                        Sharing group detail
                    </p>
                    <input 
                        type="text" 
                        placeholder="Set sharing group detail"
                        class="w-full py-3.5 px-5 rounded-lg bg-[#474747]"
                        v-model="groupDetail"
                    >
                </div>
                <div class="grid grid-rows-2 md:grid-cols-2 gap-2.5">
                    <router-link to="/share" class="md:row-start-1 row-start-2">
                        <button 
                            class="
                                font_baloo font-semibold tracking-wider bg-[#313964] hover:bg-[#2a3158] 
                                w-full text-white duration-200 rounded-xl text-sm py-2.5 md:py-3
                            "
                        >
                            Cancel
                        </button>
                    </router-link>
                    <button @click="onCreateInvitation()"
                        class="
                            font_baloo font-semibold tracking-wider bg-[#5C2D8A] hover:bg-[#502779]
                            w-full text-white duration-200 rounded-xl text-sm py-3
                        "
                    >
                        Create the invitation.
                    </button>
                </div>
            </div>

            <div
                :class="{'hidden': stepGenerate !== 2}"
                class="w-11/12 sm:w-10/12 md:w-6/12 xl:w-4/12 flex flex-col justify-center gap-4 smoothShow"
            >
                <div class="h-min text-white bg-[#2C2C2C] p-6 rounded-2xl tracking-wider">
                    <p class="font_baloo mb-2 ml-2 tracking-wider text-xl text-center">
                        Your invitation
                    </p>
                    <div class="mt-6 flex flex-col items-center gap-y-4">
                        <div class="w-full grid grid-cols-[98px_1fr_20px] items-center">
                            <span>Name</span>
                            <input 
                                v-model="share.name"
                                type="text" disabled
                                class="cursor-text w-11/12 md:w-full font-medium tracking-wider rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"
                            >
                            <button @click="onCopy(share.name)">
                                <i class="ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"></i>
                            </button>
                        </div>
                        <div class="w-full grid grid-cols-[98px_1fr_20px] items-center">
                            <span>Detail</span>
                            <input 
                                v-model="share.detail"
                                type="text" disabled
                                class="cursor-text w-11/12 md:w-full font-medium tracking-wider rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"
                            >
                            <button @click="onCopy(share.detail)">
                                <i class="ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"></i>
                            </button>
                        </div>
                        <div class="w-full grid grid-cols-[98px_1fr_20px] items-center">
                            <span>Code</span>
                            <input 
                                v-model="share.code"
                                type="text" disabled
                                class="cursor-text w-11/12 md:w-full font-medium tracking-widest rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"
                            >
                            <button @click="onCopy(share.code)">
                                <i class="ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"></i>
                            </button>
                        </div>
                        <div class="w-full grid grid-cols-[98px_1fr_20px] items-center">
                            <span>Link invite</span>
                            <input 
                                v-model="share.LinkJoin"
                                type="text" disabled
                                class="cursor-text w-11/12 md:w-full font-medium tracking-widest rounded-lg bg-[#242424] py-3 px-4 text-sm text-[#F3D014]"
                            >
                            <button @click="onCopy(share.LinkJoin)">
                                <i class="ml-1 md:ml-2 cursor-pointer hover:text-sky-300 duration-200 far fa-copy"></i>
                            </button>
                        </div>
                    </div>
                </div>
        
                <div class="flex flex-col gap-3 text-white">
                    <router-link to="/share">
                        <button 
                            class="
                                font_baloo font-semibold tracking-wider bg-[#313964] hover:bg-[#2a3158] 
                                w-full text-white duration-200 rounded-xl text-sm py-3
                            "
                        >
                            OK&nbsp;&nbsp;{{'&'}}&nbsp;&nbsp;GO BACK
                        </button>
                    </router-link>
                </div>

            </div>
        </div>

        <Toast position="bottom-right" class="Toast" />

    </Layout>
</template>

<script>

    import axios from 'axios';
    
    import Layout from '@/components/user/Layout';
    
    import ToggleButton from 'primevue/togglebutton';
    import Toast from 'primevue/toast';
    
    export default {
        name: 'Share_Create',
        components: {
            ToggleButton,
            Layout, Toast
        },
        data() {
            return {
                checked: false,
                stepGenerate: 1,
                groupName: null,
                groupDetail: null,
                validate: {
                    groupName: { msg: '', status: false },
                },
                share: {
                    name: null,
                    detail: null,
                    code: null,
                    LinkJoin: null,
                },
            }
        },
        methods: {

            onCopy(val) {
                try {
                    navigator.clipboard.writeText(val);
                    this.$toast.add({
                        severity:'success', 
                        summary: `Copied : ${val}`, 
                        detail: '', 
                        life: 600
                    });
                } catch (err) {
                    this.alertError(err);
                }
            },

            alertError() {
                this.$toast.add({
                    severity: 'error', 
                    summary: 'An error occurred in the system.', 
                    detail: 'Please try again later.', 
                    life: 1300
                });
            },

            async sendDataToShow(data) {
                this.share.name = data.name;
                this.share.detail = data.detail || '-';
                this.share.code = data.code;
                this.share.LinkJoin = `brain_plz.com/share/${data.code}`;
            },
            
            async onCreateInvitation() {
                if (this.validationForm()) {
                    await axios.post('/api/share/create', {
                        name: this.groupName,
                        detail: this.groupDetail,
                    }).then(async (res) => {
                        if (res.status === 200) {
                            await this.sendDataToShow(res.data);
                            this.stepGenerate = 2;
                            this.$toast.add({
                                severity:'success', 
                                summary: 'Create invite success', 
                                detail: '', 
                                life: 2000
                            });
                        } else {
                            this.alertError();
                        }
                    }).catch(err => { this.alertError(err); });
                }
            },

            validationForm() {
                if (this.groupName === '' || this.groupName === null) {
                    this.validate.groupName.msg = 'is required';
                    this.validate.groupName.status = !false;
                } else {
                    this.validate.groupName.msg = '';
                    this.validate.groupName.status = !true;
                    return true;
                }
            }

        },
        mounted() {
            document.title = 'Share | BrainPlz';
        },
    }

</script>