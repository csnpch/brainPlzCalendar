<template>
    <Layout>
        <div class="smoothShow mt-6 mb-10 w-10/12 md:w-10/12 xl:w-6/12 mx-auto">
            <div class="w-full font_baloo flex flex-col overflow-x-scroll bg-[#2D2D2D] p-4 pb-6 rounded-3xl md:flex justify-center mx-auto">
                <div class="flex flex-col md:flex-row justify-between p-2 gap-4">
                    <p class="text-2xl font-bold text-white ml-2">Your activitys</p>
                    <input 
                        type="text" 
                        v-model="inputSearch" 
                        @mouseenter="keyWordSearch = true" 
                        @mouseleave="keyWordSearch = false" 
                        @keypress="onSearch()"
                        placeholder="Typing to search someting" 
                        class="text-sm font_prompt w-64 md:w-72 px-4 py-2 bg-transparent border-2 rounded-lg border-white border-opacity-20" 
                    />
                </div>
                <table v-if="dataActivitys" class="w-full h-full">
                    <thead>
                        <tr class="text-white border-b border-white border-opacity-80">
                            <td class="py-4 px-6 font-bold">#</td>
                            <td class="py-4 px-6 font-bold" :class="{'text-yellow-200': keyWordSearch}">Name</td>
                            <td class="py-4 px-6 font-bold">When</td>
                            <td class="py-4 px-6 font-bold" :class="{'text-yellow-200': keyWordSearch}">Type</td>
                            <td class="py-4 px-6 font-bold" :class="{'text-yellow-200': keyWordSearch}">Access sharing</td>
                            <!-- <td class="py-4 px-6 font-bold" :class="{'text-yellow-200': keyWordSearch}">Every option</td> -->
                            <td class="py-4 px-6 font-bold">Created at</td>
                            <td class="py-4 px-6 font-bold text-center">Tools</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, index) in selectToShowActivitys" :key="index"
                            class="border-b border-white border-opacity-50"
                        > 
                            <td class="py-4 px-6 font-semibold">{{ rangeItemsShow.start + index }}</td>
                            <td class="py-4 px-6 font-semibold">{{ item.name }}</td>
                            <td class="py-4 px-6">
                                {{ getText('when', item.when) }}
                            </td>
                            <td class="py-4 px-6 font-semibold first-letter:uppercase">
                                {{ item.type }}
                            </td>
                            <td class="py-4 px-6 font-semibold">
                                {{ getText('access', item.access_rights) }}
                            </td>
                            <!-- <td class="py-4 px-6 font-semibold first-letter:uppercase">
                                {{ item.everyOption || '-' }}
                            </td> -->
                            <td class="py-4 px-6">
                                {{ getDateShow(item.createdAt) }}
                            </td>
                            <td class="py-4 px-6 font-semibold">
                                <div class="flex justify-center gap-3">
                                    <button @click="onEdit(item)" class="text-yellow-300 hover:text-yellow-500">
                                        <i class="far fa-edit"></i>
                                    </button>
                                    <button @click="onDelete($event, item)" class="text-red-400 hover:text-red-500">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="getLength(dataActivitys) === 0">
                            <td colspan="8" class="md:text-center py-4">No activity !</td>
                        </tr>
                    </tbody>
                </table>
                <Pagination 
                    v-if="getLength(dataActivitys) > 0" 
                    :totalPage="totalPage" 
                    :totalItem="getLength(dataActivitys)"
                    :rangeItemsShow="rangeItemsShow"
                    @onPage="onPage($event)" 
                />
            </div>
            
            <div class="w-full flex justify-center">
                <!-- button tailwind -->
                <router-link :to="{name: 'AddActivity'}" class="font_baloo text-sm mt-4 duration-300 bg-[#4b2b6b] hover:bg-[#41255e] text-gray-200 font-bold py-2 px-4 rounded-lg">
                    Add new activity
                </router-link>
            </div>
        </div>

        <ConfirmPopup />
        <Toast position="top-right" class="Toast" />

    </Layout>
</template>


<script>
    // TODO : edit activity

    import { provide } from 'vue';
    import store from '@/store';
    import axios from 'axios';

    import Layout from '@/components/user/Layout';
    import Pagination from '@/components/Pagination';
    import ConfirmPopup from 'primevue/confirmpopup';
    import Toast from 'primevue/toast';

    export default {
        name: 'AddActivity',
        components: {
            Layout, Pagination,
            ConfirmPopup, Toast
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                keyWordSearch: false,
                dataActivitys: [],
                selectToShowActivitys: [],
                inputSearch: '',
                totalPage: 1,
                unitItems_Show: 10,
                rangeItemsShow: {
                    start: 1,
                    end: 10,
                }
            }
        },
        watch: {
            inputSearch(val) { if (val === '') { this.getActivitys(); } }
        },
        methods: {

            getLength(obj) {
                return Object.keys(obj).length;
            },

            async countPage() {
                this.totalPage = Math.ceil(this.getLength(this.dataActivitys) / this.unitItems_Show);
            },

            async getActivitys() {
                this.dataActivitys = await store.methods.getDataActivity();
                for (let i = 0; i < this.dataActivitys.length; i++) {
                    this.dataActivitys[i].show = false;
                }
                await this.onPage(1);
            },

            getText(where, data) {
                if (where === 'access') {
                    let tmpVal = {
                        'only_me': 'Only me',
                        'some_share': 'Some group',
                        'public': 'Public'
                    }
                    for (let key in tmpVal) {
                        if (data.value === key) return tmpVal[key];
                    }
                } else if (where === 'when') {
                    if (data.day) return data.day.name;
                    if (!data.date[1]) return this.getDateShow(data.date[0]); 
                    return this.getDateShow(data.date[0]) + ' - ' + this.getDateShow(data.date[1]);
                } 
                // else if (where === 'every') {
                //     if (data.every) return data.every.value;
                // }
                return '-';
            },
            
            getDateShow(date) {
                let tmpDate = new Date(date);

                const addZeroFront = (txt) => txt.toString().length === 1 ? '0' + txt : txt;
                return addZeroFront(tmpDate.getDate()) + '/' + addZeroFront(tmpDate.getMonth() + 1) + '/' + tmpDate.getFullYear();
            },
            
            onSearch() {
                if (this.inputSearch.length > 0) {
                    axios.post('/api/activity/search', {keyword: this.inputSearch})
                        .then(res => {
                            this.dataActivitys = res.data;
                        })
                        .catch(err => {
                            this.$toast.add({
                                severity:'warn', 
                                summary: 'System search have a problem', 
                                detail: 'Please try again later.', 
                                life: 1300
                            });
                        });
                }
            },

            onEdit(item) {
                alert(JSON.stringify(item));
            },

            onDelete(event, item) {
                this.$confirm.require({
                    target: event.currentTarget,
                    message: 'Are you sure?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        axios.post('/api/activity/delete', {activity_id: item._id})
                            .then(res => {
                                this.$toast.add({
                                    severity:'success', 
                                    summary: 'Successfully', 
                                    detail:'Delete activity success', 
                                    life: 1300
                                });
                                store.methods.deleteDataActivity(item._id);
                                this.getActivitys();
                            })
                            .catch(err => {
                                this.$toast.add({
                                    severity:'error', 
                                    summary: 'An error occurred in the system.', 
                                    detail: 'Please try again later.', 
                                    life: 1300
                                });
                            });
                    }
                });
            },
            
            checkDeviceClient() {
                return window.innerWidth < 768;
            },

            async onPage(page) {
                this.unitItems_Show = this.checkDeviceClient() ? 5 : 10;
                this.rangeItemsShow.start = (page - 1) * this.unitItems_Show + 1;
                this.rangeItemsShow.end = page * this.unitItems_Show;
                
                this.selectToShowActivitys = [];
                for (let i = this.rangeItemsShow.start - 1; i < this.rangeItemsShow.end; i++) {
                    if (this.dataActivitys[i]) {
                        this.selectToShowActivitys.push(this.dataActivitys[i]);
                    }
                }
                await this.countPage();
            }

        },
        async mounted() {
            document.title = 'Activity | BrainPlz';
            await this.getActivitys();
        }
    }

</script>
