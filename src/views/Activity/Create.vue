<template>
    <Layout class="bg-[#1b1b1b]">
        <div class="smoothShow w-full text-center text-white mb-10">
            
            <p class="mt-4 md:mt-6 font_baloo font-semibold text-2xl">“ Add activity ”</p>
            
            <div class="block mx-auto w-11/12 md:w-6/12 lg:w-5/12 xl:w-4/12">

                <div class="w-full flex flex-col gap-4 mt-6 bg-[#242424] p-6 mx-auto rounded-xl">

                    <div class="border-b-2 border-white border-opacity-10 pb-4">
                        <div class="flex flex-col md:flex-row items-center">
                            <p class="w-full ml-5 md:ml-0 mb-2 md:mb-0 md:w-12 text-left font_prompt mr-4">Type :</p>
                            <div @click="checkType()" class="flex flex-row gap-4 mt-1.5">
                                <div>
                                    <input @click="selectType('work')" type="radio" name="type" class="cursor-pointer" checked>
                                    <span class="ml-1 font_baloo">Work</span>
                                </div>
                                <div>
                                    <input @click="selectType('classes')" type="radio" name="type" class="cursor-pointer">
                                    <span class="ml-1 font_baloo">Classes</span>
                                </div>
                                <div>
                                    <input @click="selectType('event')" type="radio" name="type" class="cursor-pointer">
                                    <span class="ml-1 font_baloo">Event</span>
                                </div>
                                <div>
                                    <input @click="selectType('other')" type="radio" name="type" class="cursor-pointer">
                                    <span class="ml-1 font_baloo">Other</span>
                                </div>
                            </div>
                        </div>
                        <p v-if="form.type.classes" class="text-left font_baloo mt-1 text-sm text-[#D7FF66]">
                            If type is classes show automatic activity evey week.
                        </p>
                    </div>

                    <div class="flex flex-col gap-2 justify-start items-start border-b-2 border-white border-opacity-10 pb-4">
                        <p class="min-w-max">
                            <span class="text-xl text-[#FF8514]">*</span>
                            Activity name
                        </p>
                        <InputText 
                            v-model="form.name"
                            type="text" placeholder="Activity name" 
                            class="
                                font_itim text-[0.9rem] w-11/12 p-2 
                                rounded-md text-white py-2.5 md:ml-5
                            "
                            :class="{'p-invalid': validate.name.status}"
                            @change="validationForm('name')"
                            @keyup="validationForm('name')"
                        />
                        <p v-if="validate.name.status" class="text-sm -mt-1 md:ml-6 text-red-400">
                            {{ 'Activity name ' + validate.name.msg }}
                        </p>
                    </div>
                    
                    <div class="flex flex-col items-start gap-4 border-b-2 border-white border-opacity-10 pb-6">
                        <p class="min-w-max">
                            <span class="text-xl text-[#FF8514]">*</span>
                            When
                        </p>
                        <div class="w-full flex flex-col items-start gap-4">
                            <div v-if="!form.type.classes" class="mt-2 md:mt-0 flex flex-col gap-4 md:gap-0 md:grid md:grid-cols-[80px_1fr] items-center w-full">
                                <span class="w-full text-left md:text-center text-[#FFC737]">DATE</span>
                                <Calendar
                                    id="calendarPickup"
                                    placeholder="Pickup date"
                                    v-model="form.when.date"
                                    :showIcon="true"
                                    dateFormat="dd/mm/yy"
                                    selectionMode="range"
                                    class="w-full md:w-11/12"
                                    :class="{'p-invalid': validate.when.status}"
                                    @change="validationForm('when')"
                                    @keyup="validationForm('when')"
                                />
                                <p v-if="validate.when.status" class="md:ml-12 w-40 md:mt-2 text-sm text-red-400">
                                    {{ 'Date ' + validate.when.msg }}
                                </p>
                            </div>
                            <div :class="{'hidden': !form.type.classes}" class="grid grid-cols-[80px_1fr] items-center w-full">
                                <span class="text-[#FFC737]">DAY</span>
                                <Dropdown class="text-left" v-model="form.when.day" :options="selectDay" optionLabel="name" placeholder="Select day" />
                                <p v-if="validate.day.status" class="md:ml-12 w-40 md:mt-2 text-sm text-red-400">
                                    {{ 'Day  ' + validate.day.msg }}
                                </p>
                            </div>
                            <div class="w-full ml-6 md:ml-0 mt-2 md:mt-0 gap-4 md:gap-0 grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr] items-center">
                                <span class="text-[#FFC737] text-left md:text-center w-full">TIME</span>
                                <div class="w-full flex flex-row items-center gap-1.5 md:w-60">
                                    <div :class="{'hidden': statusFullTime}" class="flex flex-row gap-1.5 items-center">
                                        <Calendar 
                                            v-model="form.when.time_start" 
                                            :showTime="true" 
                                            :timeOnly="true" 
                                            placeholder="start"
                                            class="w-14"
                                        />
                                        <span class="mt-1 text-xl font-semibold font_baloo">-</span>
                                        <Calendar 
                                            v-model="form.when.time_end" 
                                            :showTime="true" 
                                            :timeOnly="true" 
                                            placeholder="end"
                                            class="w-14"
                                        />
                                    </div>
                                    <Checkbox @click="setFullTime()" v-model="statusFullTime" :binary="true" />
                                    <span>Full day</span>
                                </div>
                                <p v-if="validate.time.status" class="ml-14 md:ml-20 w-52 md:w-64 md:mt-2 text-left text-sm text-indigo-300">
                                    {{ 'Please check, time start or end and submit form again' }}
                                </p>
                            </div>
                            <!-- <div :class="{'hidden': form.type.classes}" class="mt-2 mb-2 ml-12 md:ml-6 flex flex-row gap-2">
                                <Checkbox @click="form.everyOption.status = !form.everyOption.status" v-model="form.everyOption.status" :binary="true" />
                                <span class="">Every option</span>
                            </div>
                            <div v-if="form.everyOption.status" class="grid grid-cols-[80px_1fr] items-start md:ml-1">
                                <span class="text-[#FFC737]">EVERY</span>
                                <div class="flex flex-col md:flex-row">
                                    <div class="text-left">
                                        <input type="radio" name="every" 
                                            @click="selectEvery('week')"
                                            :checked="form.everyOption.status"
                                            class="mr-1 cursor-pointer">
                                        <span  class="mr-4 font_baloo">Week</span>
                                    </div>
                                    <div class="text-left">
                                        <input type="radio" name="every" 
                                            @click="selectEvery('month')"
                                            class="mr-1 cursor-pointer"
                                        >
                                        <span  class="mr-4 font_baloo">Month</span>
                                    </div>
                                    <div class="text-left">
                                        <input type="radio" name="every"
                                            @click="selectEvery('year')" 
                                            class="mr-1 cursor-pointer"
                                        >
                                        <span  class="mr-4 font_baloo">Year</span>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-2">
                        <div class="w-full grid grid-cols-[60px_1fr] items-center gap-2  border-b-2 border-white border-opacity-10 pb-5">
                            <p>Where : </p>
                            <span 
                                @click="clickToAdd[0] = !clickToAdd[0]"
                                :class="{'hidden': clickToAdd[0]}"
                                class="
                                    w-[72px] mt-1.5 font_baloo text-sm text-[#37CFFF] border-b-[1px] border-opacity-50 border-[#37CFFF] 
                                    cursor-pointer hover:text-yellow-500 hover:border-yellow-500 duration-200
                                "
                            >
                                click to add
                            </span>
                            <div class="flex flex-row items-center gap-2 mr-2" :class="{'hidden': !clickToAdd[0]}">
                                <InputText 
                                    v-model="form.where"
                                    type="text" placeholder="where" 
                                    class="
                                        w-full ml-2 font_itim text-[0.9rem] p-2 border-none 
                                        text-white py-2.5 
                                    "
                                />    
                                <button @click="clickToAdd[0] = !clickToAdd[0]">
                                    <i class="fas fa-times cursor-pointer text-sm text-yellow-500"></i>
                                </button>
                            </div>
                        </div>
                        <div class="mt-1.5 grid grid-cols-[60px_1fr] items-center gap-2  border-b-2 border-white border-opacity-10 pb-5">
                            <p>Detail : </p>
                            <span 
                                @click="clickToAdd[1] = !clickToAdd[1]"
                                :class="{'hidden': clickToAdd[1]}"
                                class="
                                    w-[72px] mt-1.5 font_baloo text-sm text-[#37CFFF] border-b-[1px] border-opacity-50 border-[#37CFFF] 
                                    cursor-pointer hover:text-yellow-500 hover:border-yellow-500 duration-200
                                "
                            >
                                click to add
                            </span>
                            <div class="flex flex-row items-center gap-2 mr-2" :class="{'hidden': !clickToAdd[1]}">
                                <InputText 
                                    v-model="form.detail"
                                    type="text" placeholder="detail" 
                                    class="
                                        w-full ml-2 font_itim text-[0.9rem] p-2 border-none 
                                        text-white py-2.5 
                                    "
                                />    
                                <button @click="clickToAdd[1] = !clickToAdd[1]">
                                    <i class="fas fa-times cursor-pointer text-sm text-yellow-500"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">

                        <div class="w-full text-left ml-1 flex flex-col gap-6">
                            <div class="flex flex-col md:flex-row gap-y-2 ml-4 md:-ml-0 gap-x-5 justify-start">
                                <p>Access sharing :</p>
                                <div>
                                    <input type="radio" name="access_rights" 
                                        @click="selectAccess('only_me')" 
                                        class="cursor-pointer ml-4 md:ml-0 mt-2 md:mt-0 mr-1" checked
                                    />
                                    <span>Only me</span>
                                </div>
                                <div>
                                    <input type="radio" name="access_rights" 
                                        @click="selectAccess('some_share')" 
                                        class="cursor-pointer ml-4 md:ml-0 mt-1.5 md:mt-0 mr-1"
                                    />
                                    <span>Public on sharing</span>
                                </div>
                                <!-- <div>
                                    <input type="radio" name="access_rights" @click="selectAccess('public')" class="cursor-pointer mr-1">
                                    <span>Public on sharing</span>
                                </div> -->
                            </div>

                            <!-- <p v-if="form.access_rights.public" class="-mt-2 -mb-2 text-center font_baloo text-sm text-[#D7FF66]">
                                Will be shared to &nbsp;“ all ”&nbsp; your participation.
                            </p> -->
                            
                            <div v-if="form.access_rights.some_share" class="w-10/12 md:w-80 flex flex-col md:flex-row md:items-center gap-3 md:gap-2 ml-4 md:ml-12">
                                <p class="w-24 -mt-2">Share to :</p>
                                <MultiSelect 
                                        class="w-full ml-2 md:ml-0"
                                        v-model="form.access_rights.selectSharing" :options="selectSharing.grouped"
                                        optionLabel="label" optionGroupLabel="label" optionGroupChildren="items">
                                </MultiSelect>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="mt-3 flex gap-3 flex-row-reverse">
                    <button @click="callPopup(1)" class="w-full bg-[#5C2D8A] hover:bg-[#502779] duration-300 py-2.5 rounded-lg">
                        Create
                    </button>
                    <button @click="callPopup(2)" class="w-full bg-[#313964] hover:bg-[#2a3055] duration-300 py-2 rounded-lg">
                        Back
                    </button>
                </div>

            </div>

        </div>

        <ConfirmDialog position="center" />
        <Toast position="top-right" class="Toast" />

    </Layout>
</template>


<script>

    import { provide } from 'vue';
    import store from '@/store';
    import axios from 'axios';

    import Layout from '@/components/user/Layout';

    import Toast from 'primevue/toast';
    import InputText from 'primevue/inputtext';
    import Calendar from 'primevue/calendar';
    import Checkbox from 'primevue/checkbox';
    import MultiSelect from 'primevue/multiselect';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Dropdown from 'primevue/dropdown';

    export default {
        name: 'AddActivity',
        components: {
            Layout, Toast,
            Calendar, Checkbox, 
            InputText, MultiSelect, 
            ConfirmDialog, Dropdown
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                pass: () => {},
                statusFullTime: false,
                dataInsert: null,
                form: {
                    name: null,
                    type: {
                        work: true,
                        classes: false,
                        event: false,
                        other: false,
                    },
                    where: null,
                    detail: null,
                    when: {
                        time_start: null,
                        time_end: null,
                        date: null,
                        day: null
                    },
                    // everyOption: {
                    //     status: false,
                    //     week: true,
                    //     month: false,
                    //     year: false
                    // },
                    access_rights: {
                        only_me: true,
                        some_share: false,
                        public: false,
                        selectSharing: null
                    }                    
                },
                clickToAdd: [
                    false, false
                ],
                selectSharing: {
                    grouped: [
                        {label: 'Sharings', items: []}
                    ]
                },
                selectDay: [
                    {name: 'Monday', value: '1'},
                    {name: 'Tuesday', value: '2'},
                    {name: 'Wednesday', value: '3'},
                    {name: 'Thursday', value: '4'},
                    {name: 'Friday', value: '5'},
                    {name: 'Saturday', value: '6'},
                    {name: 'Sunday', value: '0'},
                ],
                validate: {
                    name: { msg: '', status: false },
                    time: { msg: '', status: false },
                    when: { msg: '', status: false },
                    day: { msg: '', status: false }
                },
            }
        },
        // watch example
        methods: {

            async setSelectAccessSharing() {
                let accessSharings = await store.methods.getDataSharing();
                
                const customPushAccessSharing = async (accessSharings) => {

                    for (let item of accessSharings.sharings) {
                        if (!item.creator) {
                            this.selectSharing.grouped[0].items.push({
                                label: item.name,
                                value: item.public_key
                            });
                        } 
                        // else {
                        //     this.selectSharing.grouped[1].items.push({
                        //         label: item.name,
                        //         value: item.public_key
                        //     });
                        // }
                    }

                    for (let item of this.selectSharing.grouped) {
                        if (item.items.length == 0) {
                            this.selectSharing.grouped.splice(this.selectSharing.grouped.indexOf(item), 1);
                        }
                    }

                }

                await customPushAccessSharing(accessSharings);
            },

            selectType(where) {
                this.form.type[where] = true;
                for (let key in this.form.type) {
                    if (key !== where) { this.form.type[key] = false; }
                }
            },

            // selectEvery(where) {
            //     this.form.everyOption[where] = true;
            //     for (let key in this.form.everyOption) {
            //         if (key !== where && key !== 'status') { this.form.everyOption[key] = false; }
            //     }
            // },

            selectAccess(where) {
                this.form.access_rights[where] = true;
                for (let key in this.form.access_rights) {
                    if (key !== where) { this.form.access_rights[key] = false; }
                }
            },

            checkType() {
                if (this.form.type.classes) { this.form.when.date = null; }
            },

            processDataToInsert() {
                
                let tmpType = { val: null, key: ['work', 'classes', 'event', 'other'] };
                // let tmpEvery = { val: null, key: ['status', 'week', 'month', 'year'] };
                let tmpAccess = { val: null, key: ['only_me', 'some_share', 'public'] };
                let tmpPublicAccess = [];

                try {
                    this.form.access_rights.selectSharing.forEach(item => {
                        tmpPublicAccess.push(item.value);
                    });
                } catch (err) { this.pass(); }

                for (let key of tmpType.key) {
                    if (this.form.type[key]) {
                        tmpType.val = key;
                        break;
                    }
                }

                // if (this.form.everyOption.status) {
                //     for (let key of tmpEvery.key) {
                //         if (this.form.everyOption[key] && key !== 'status') {
                //             tmpEvery.val = key;
                //             break;
                //         }
                //     }
                // }

                for (let key of tmpAccess.key) {
                    if (this.form.access_rights[key]) {
                        tmpAccess.val = key;
                        break;
                    }
                }

                let data = {
                    name: this.form.name,
                    type: tmpType.val,
                    where: this.form.where,
                    detail: this.form.detail,
                    
                    when: {
                        time_start: this.form.when.time_start,
                        time_end: this.form.when.time_end,
                        date: this.form.when.date,
                        day: this.form.when.day,
                    },
                    
                    // everyOption: tmpEvery.val,
                    access_rights: {
                        value: tmpAccess.val,
                        public_key: tmpPublicAccess,
                    }
                }
                return data;
            },

            alertError() {
                this.$toast.add({
                    severity:'error', 
                    summary: 'An error occurred in the system.', 
                    detail: 'Please try again later.', 
                    life: 1300
                });
            },

            async callPopup(where) {
                switch (where) {
                    case 1:
                        this.dataInsert = await this.processDataToInsert();
                        this.$confirm.require({
                            message: 'Are you sure you want to proceed?',
                            header: 'Confirmation',
                            icon: 'pi pi-exclamation-triangle',
                            accept: () => {
                                // if (!this.form.everyOption.status) { this.form.everyOption.week = false; }
                                if(this.validationForm('onSubmit')) {
                                    axios.post('/api/activity/create', {
                                        form: this.dataInsert
                                    }).then(res => {
                                        if (res.status === 200) {
                                            store.methods.pushDataActivity(res.data);
                                            this.$toast.add({
                                                severity:'success', 
                                                summary: 'Successfully', 
                                                detail:'Wait a moment...', 
                                                life: 1300
                                            });
                                            setTimeout(() => { this.$router.push({name: 'Activity'}); }, 1800);
                                        } else {
                                            this.alertError();
                                        }
                                    }).catch(err => {
                                        this.alertError();
                                    });
                                } else {
                                    this.$toast.add({
                                        severity:'warn',
                                        summary: 'Please check data in form', 
                                        detail:'', 
                                        life: 1300
                                    });
                                }
                            },
                            reject: () => { return; }
                        });    
                        break;
                    case 2:
                        this.$confirm.require({
                            message: 'Do you want to go back?',
                            header: 'Confirmation',
                            icon: 'pi pi-exclamation-triangle',
                            accept: () => {
                                this.$router.push({name: 'Home'});
                            },
                            reject: () => { return; }
                        });    
                        break;
                }
            },

            setFullTime() {
                if (!this.statusFullTime) { this.form.when.time_start = 'full_time'; } 
                else { this.form.when.time_start = null; }
                this.form.when.time_end = null;
            },

            validationForm(name) {

                if (name === 'onSubmit' || name === 'name') {
                    if (this.form.name === '' || this.form.name === null) {
                        this.validate.name.msg = 'is required';
                        this.validate.name.status = !false;
                    } else {
                        this.validate.name.msg = '';
                        this.validate.name.status = !true;
                    }
                }

                if ((name === 'onSubmit' && this.form.type.classes) || (name === 'day' && this.form.type.classes)) {
                    setInterval(() => {
                        if (this.form.when.day === '' || this.form.when.day === null) {
                            this.validate.day.msg = 'is required';
                            this.validate.day.status = !false;
                        } else {
                            this.validate.day.msg = '';
                            this.validate.day.status = !true;
                        }
                    }, 1000);
                }
                
                if ((name === 'onSubmit' && !this.form.type.classes) || (name === 'when' && !this.form.type.classes)) {
                    setInterval(() => {
                        if (!this.form.type.classes) {
                            if (this.form.when.date === '' || this.form.when.date === null) {
                                this.validate.when.msg = 'is required';
                                this.validate.when.status = !false;
                            } else {
                                this.validate.when.msg = '';
                                this.validate.when.status = !true;
                            }
                        } else {
                            if (this.form.when.day === '' || this.form.when.day === null) {
                                this.validate.when.msg = 'is required';
                                this.validate.when.status = !false;
                            } else {
                                this.validate.when.msg = '';
                                this.validate.when.status = !true;
                            }
                        }
                    }, 1000);
                }

                if (name === 'onSubmit' || name === 'time') {
                    let statusCheckTimes = true;
                    try {
                        if (this.form.when.time_end) {
                            let timeStart = new Date(this.form.when.time_start).toString().split(' ')[4].split(':');
                            let timeEnd = new Date(this.form.when.time_end).toString().split(' ')[4].split(':');
                            if (timeStart[0] > timeEnd[0]) {
                                statusCheckTimes = false;
                            } else if (timeStart[0] === timeEnd[0]) {
                                if (timeStart[1] > timeEnd[1]) { statusCheckTimes = false; }
                            }
                        }
                    } catch (err) { statusCheckTimes = false; }

                    if (
                        this.form.when.time_start !== 'full_time' 
                        && !statusCheckTimes 
                        || this.form.when.time_start === ''
                        || this.form.when.time_start === null
                    ) {
                        this.validate.time.msg = 'is invalid';
                        this.validate.time.status = !false;
                    } else {
                        this.validate.time.msg = '';
                        this.validate.time.status = !true;
                    }
                }

                let statusCheck = true; 
                for (let key in this.validate) {
                    if (this.validate[key].status) {
                        statusCheck = false;
                        break;
                    } 
                }
                return statusCheck;
            },
        },
        async mounted() {
            document.title = 'Activity | BrainPlz';
            await this.setSelectAccessSharing();
        }
    }
</script>


<style scoped>

    input[type="radio"] {
        width: 0.9rem;
        height: 0.9rem;
    }

</style>