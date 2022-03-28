<template>
    <Layout :visibleScroll="true">

        <div class="smoothShow w-11/12 md:w-9/12 mx-auto grid gap-4 md:gap-6"
            :class="{'lg:grid-cols-[5fr_4fr] 2xl:grid-cols-[2fr_1fr]': dataSharing.status}"
        >
            
            <div class="container_todayAndTollmorrow gap-4 md:gap-6 w-full
                flex items-start justify-start mx-auto text-white"
                :class="{
                    'lg:flex-row flex-col': !dataSharing.status,
                    'flex-col 2xl:flex-row': dataSharing.status
                }"
            >

                <div class="container_today w-full p-4 md:p-6 bg-[#2C2C2C] rounded-2xl">
                    <div class="font_baloo font-semibold flex justify-between items-end">
                        <p class="text-xl md:text-2xl">
                            🌈&nbsp;&nbsp;TODAY
                        </p>
                        <p class="text-yellow-500 tracking-wider mr-0.5 md:mr-1">
                            {{ getDateShow('today') }}
                        </p>
                    </div>
                    <p v-if="!checkShow('today')" class="mt-8 mb-2 text-sm font_prompt text-center text-sky-200">
                        No activity today <span class="text-[1rem]">🥰</span>
                    </p>
                    <div v-if="checkShow('today')">
                        <div v-for="(data, key) in activityToday" :key="key"
                            class="flex flex-col gap-y-2.5 tracking-wider"
                        >
                            <!-- no activity today -->
                            <p v-if="getLength(data)" 
                                class="font_baloo first-letter:uppercase mt-4 -mb-2 ml-1"
                            >
                                {{ key }}
                            </p>
                            <div @click="onPopupActivity(item)" v-for="(item) in data" :key="item"
                                class="
                                    grid grid-cols-[1fr_68px] justify-between items-center px-3 py-2.5 lg:pt-3.5 lg:pb-3 lg:px-4 
                                    rounded-md font_itim cursor-pointer duration-200
                                "
                                :class="{
                                    'bg-[#525ECA] hover:bg-[#4853b1]': item.type === 'classes',
                                    'bg-[#2080B7] hover:bg-[#1c6fa0]': item.type === 'event',
                                    'bg-[#B73B20] hover:bg-[#a1331a]': item.type === 'work',
                                    'bg-[#925207] hover:bg-[#7e4b12]': item.type === 'other'
                                }"
                            >
                                <p class="text-sm first-letter:uppercase">{{item.name}}</p>
                                <p class="text-sm">{{item.time}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container_tollmorrow w-full p-4 md:p-6 bg-[#2C2C2C] rounded-2xl min-w-min">
                    <div class="font_baloo font-semibold flex justify-between items-end">
                        <p class="text-xl md:text-2xl">
                            🌜&nbsp;&nbsp;Tollmorrow
                        </p>
                        <p class="text-yellow-500 tracking-wider mr-0.5 md:mr-1">
                            {{ getDateShow('tollmorrow') }}
                        </p>
                    </div>
                    <p v-if="!checkShow('tollmorrow')" class="mt-8 mb-2 text-sm font_prompt text-center text-sky-200">
                        No activity tollmorrow <span class="text-[1rem]">🥰</span>
                    </p>
                    <div v-if="checkShow('tollmorrow')">
                        <div v-for="(data, key) in activityTollmorrow" :key="key"
                            class="flex flex-col gap-y-2.5 tracking-wider"
                        >
                            <p v-if="getLength(data)" 
                                class="font_baloo first-letter:uppercase mt-4 -mb-2 ml-1"
                            >
                                {{ key }}
                            </p>
                            <div @click="onPopupActivity(item)" v-for="(item) in data" :key="item"
                                class="
                                    grid grid-cols-[1fr_68px] justify-between items-center px-3 py-2.5 lg:pt-3.5 lg:pb-3 lg:px-4 
                                    rounded-md font_itim cursor-pointer duration-200
                                "
                                :class="{
                                    'bg-[#525ECA] hover:bg-[#4853b1]': item.type === 'classes',
                                    'bg-[#2080B7] hover:bg-[#1c6fa0]': item.type === 'event',
                                    'bg-[#B73B20] hover:bg-[#a1331a]': item.type === 'work',
                                    'bg-[#925207] hover:bg-[#7e4b12]': item.type === 'other'
                                }"
                            >
                                <p class="text-sm first-letter:uppercase">{{item.name}}</p>
                                <p class="text-sm">{{item.time}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>

            <div class="smoothShow w-full flex flex-col md:mb-0">
                <!-- router link to share -->
                <router-link to="/share">
                    <div
                        v-if="!dataSharing.status" 
                        class="
                            rounded-2xl font_baloo font-semibold text-center p-3 duration-200 text-sm w-full lg:w-fit
                            lg:fixed lg:px-10 lg:bottom-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:text-base
                            bg-[#2C2C2C] hover:bg-[#262626] cursor-pointer hover:text-sky-400
                        "
                    >
                        <p>Share & Join information with other</p>
                    </div>
                    <div
                        v-if="dataSharing.status"
                        class="
                            rounded-2xl font_baloo font-semibold text-center p-3 md:p-5 duration-200
                            bg-[#2C2C2C] hover:bg-[#262626] cursor-pointer hover:text-sky-400 mb-4 md:mb-6
                        "
                    >
                        <p class="text-[1rem] md:text-[1.12rem] mt-1">You have been sharing the events from</p>
                        <p class="text-[0.8rem] md:text-sm mt-0.5 md:mt-2.5">" KMUTNB , FITM , IT SEC 2 , MY FRIEND GROUP "</p>
                    </div>
                </router-link>
                <div v-if="dataSharing.status" class="rounded-2xl p-4 md:p-4 md:px-6 bg-[#2C2C2C]">
                        <div>
                            <p class="font_baloo font-semibold text-center p-3 mb-2 text-lg">What new ?</p>
                        </div>
                        <div>
                        <ScrollPanel style="width: 100%;" class="custom mb-3 max-h-96 md:max-h-[60vh]">
                            <div v-for="item in shareEvents" :key="item"
                                class="
                                    grid grid-cols-[1fr_68px] grid-rows-2 gap-y-6 p-6 mb-4 justify-between items-center font_itim
                                    shadow-md rounded-xl cursor-pointer bg-[#4C3B3B] hover:bg-[#403232] duration-200
                                "
                            >
                                <p class="flex justify-start items-start">
                                    {{item.name}}
                                </p>
                                <p class="flex justify-end items-start text-sm text-right">
                                    {{item.date}}
                                </p>
                                <div class="flex flex-row gap-x-2 justify-start items-center">
                                    <i class="fas fa-map-marker-alt text-sm"></i>
                                    <p class="text-xs mt-0.5">{{item.area}}</p>
                                </div>
                                <p class="text-sm text-right flex justify-end items-center">
                                    <i class="fas fa-user text-xs mr-2 min-h"></i>
                                    {{item.join}}
                                </p>
                            </div>
                        </ScrollPanel>
                    </div>
                </div>
            </div>

        </div>

        <div class="mb-10"></div>

        
        <Popup 
            v-if="popupActivity.status" 
            :activity="popupActivity.data" 
            @closePopup="closePopup"
        />

        <Toast />

    </Layout>
</template>

<script>
    import { provide } from 'vue';
    import store from '@/store';
    // import axios from 'axios';
    
    import Layout from '@/components/user/Layout';
    import Popup from '@/components/activity/Popup';

    import Toast from 'primevue/toast';
    import ScrollPanel from 'primevue/scrollpanel';
import axios from 'axios';

    export default {
        name: 'Home',
        components: {
            Layout, ScrollPanel,
            Toast, Popup
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                popupActivity: {
                    status: false,
                    data: {
                        name: 'Hi'
                    }
                },
                typeName: ['classes', 'event', 'work', 'other'],
                dataSharing: { status: false },
                dataActivitys: [],
                activityToday: {
                    work: [],
                    classes: [],
                    event: [],
                    other: []
                },
                activityTollmorrow: {
                    work: [],
                    classes: [],
                    event: [],
                    other: []
                },
                shareEvents: [
                    {name: 'Fotball & Run fight', area: 'KMUTNB PARCHAIBURI', date: '23/04/22', type: 'event', 'join': 24},
                    {name: 'Activities to welcome new students', area: 'KMUTNB PARCHAIBURI, FITM Building', date: '12/05/22', type: 'event', 'join': 6},
                    {name: 'Fotball & Run fight', area: 'KMUTNB PARCHAIBURI', date: '23/04/22', type: 'event', 'join': 24},
                    {name: 'Activities to welcome new students', area: 'KMUTNB PARCHAIBURI, FITM Building', date: '12/05/22', type: 'event', 'join': 6},
                    {name: 'Fotball & Run fight', area: 'KMUTNB PARCHAIBURI', date: '23/04/22', type: 'event', 'join': 24},
                    {name: 'Activities to welcome new students', area: 'KMUTNB PARCHAIBURI, FITM Building', date: '12/05/22', type: 'event', 'join': 6},
                    {name: 'Fotball & Run fight', area: 'KMUTNB PARCHAIBURI', date: '23/04/22', type: 'event', 'join': 24},
                    {name: 'Activities to welcome new students', area: 'KMUTNB PARCHAIBURI, FITM Building', date: '12/05/22', type: 'event', 'join': 6},
                    {name: 'Fotball & Run fight', area: 'KMUTNB PARCHAIBURI', date: '23/04/22', type: 'event', 'join': 24},
                    {name: 'Activities to welcome new students', area: 'KMUTNB PARCHAIBURI, FITM Building', date: '12/05/22', type: 'event', 'join': 6},
                ]
            }
        },
        methods: {

            onPopupActivity(item) {
                for (let activity of this.dataActivitys) {
                    if (activity._id === item.id) {
                        axios.get(`/api/user/getNameUser/${activity.creator}`)
                            .then(res => {
                                this.popupActivity.data = activity;
                                this.popupActivity.data.nameCreator = res.data;
                                this.popupActivity.status = !this.popupActivity.status;
                            })
                            .catch(err => { err })
                        return;
                    }
                }
            },

            closePopup() {
                this.popupActivity.status = false;
            },

            checkShow(where) {
                for (let key of this.typeName) {
                    if (where === 'today') { 
                        if (this.activityToday[key].length > 0) {
                            return true;
                        }
                    } else if (where === 'tollmorrow') {
                        if (this.activityTollmorrow[key].length > 0) {
                            return true;
                        }
                    }
                }
                return false;
            },

            getLength(obj) {
                return Object.keys(obj).length;
            },
            
            getDateShow(where) {
                let now = new Date();
                if (where === 'today') {
                    return now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear().toString().substr(-2);
                } else if (where === 'tollmorrow') {
                    return (now.getDate() + 1) + '/' + (now.getMonth() + 1) + '/' + now.getFullYear().toString().substr(-2);
                }
            },
            
            async getSharingData() {
                this.dataSharing = await store.methods.getDataSharing();
            },
            
            async getActivitys() {
                this.dataActivitys = await store.methods.getDataActivity();
            },
            
            async convertTimeToAmPm() {
                const process = (val) => {
                    if (val.toString().toLowerCase() !== 'full_time') {
                        hours = new Date(val).getHours();
                        minutes = new Date(val).getMinutes();
                        ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        minutes = minutes < 10 ? '0'+minutes : minutes;
                        return (hours.toString().length < 2 ? 0 + hours.toString() : hours) + ':' + minutes + ' ' + ampm;
                    } else {
                        return "Full time";
                    }
                };
                let hours, minutes, ampm;
                for (let key of this.typeName) {
                    this.activityToday[key].forEach(item => {
                        item.time = process(item.time);
                    });
                }
                for (let key of this.typeName) {
                    this.activityTollmorrow[key].forEach(item => {
                        item.time = process(item.time);
                    });
                }
            },
            
            async customDataShow() {

                let check = { 
                    day: [null, null, null], 
                    month: [null, null, null], 
                    year: [null, null, null], 
                    dayName: [null, null]
                };
                let dateNow = new Date();

                const addActivity = (key, id, name, type, time, where) => {
                    if (where === 'today') {
                        this.activityToday[key].push({
                            id: id,
                            name: name,
                            type: type,
                            time: time
                        });
                    } else if (where === 'tollmorrow') {
                        this.activityTollmorrow[key].push({
                            id: id,
                            name: name,
                            type: type,
                            time: time
                        });
                    }
                };


                this.dataActivitys.forEach(val => {
                    for (let key of this.typeName) {
                        if (val.type === key) {
                            if (val.type === this.typeName[0]) {
                                if (parseInt(val.when.day.value) === dateNow.getDay()) {
                                    addActivity(key, val._id, val.name, val.type, val.when.time_start, 'today');
                                } else if (parseInt(val.when.day.value) === dateNow.getDay() + 1) {
                                    addActivity(key, val._id, val.name, val.type, val.when.time_start, 'tollmorrow');
                                }
                            } else if (val.when.date !== null) {
                                let dateStart = new Date(val.when.date[0]);
                                let dateStop = null;

                                if (val.when.date[1] !== null) {
                                    dateStop = new Date(val.when.date[1]);
                                    check.day[0] = parseInt(dateStart.toString().split(' ')[2]);
                                    check.day[1] = dateNow.getDate();
                                    check.day[2] = parseInt(dateStop.toString().split(' ')[2]);
                                    check.month[0] = parseInt(dateStart.getMonth() + 1);
                                    check.month[1] = dateNow.getMonth() + 1;
                                    check.month[2] = parseInt(dateStop.getMonth() + 1);
                                    check.year[0] = parseInt(dateStart.getFullYear());
                                    check.year[1] = dateNow.getFullYear();
                                    check.year[2] = parseInt(dateStop.getFullYear());
                                    if (check.day[1] >= check.day[0] && check.day[1] <= check.day[2]) {
                                        if (check.month[1] >= check.month[0] && check.month[1] <= check.month[2]) {
                                            if (check.year[1] >= check.year[0] && check.year[1] <= check.year[2]) {
                                                if (dateNow.getDay() !== dateStart.getDay()) { val.when.time_start = 'full_time'; }
                                                addActivity(key, val._id, val.name, val.type, val.when.time_start, 'today');
                                            }
                                        }
                                    } 
                                    if ((check.day[1] + 1) >= check.day[0] && (check.day[1] + 1) <= check.day[2]) {
                                        if (check.month[1] >= check.month[0] && check.month[1] <= check.month[2]) {
                                            if (check.year[1] >= check.year[0] && check.year[1] <= check.year[2]) {
                                                if (dateNow.getDay() + 1 !== dateStart.getDay()) {
                                                    val.when.time_start = 'full_time';
                                                }
                                                addActivity(key, val._id, val.name, val.type, val.when.time_start, 'tollmorrow');
                                            }
                                        }
                                    }
                                } else {
                                    check.day[0] = parseInt(dateStart.toString().split(' ')[2]);
                                    check.day[1] = dateNow.getDate();
                                    check.month[0] = parseInt(dateStart.getMonth() + 1);
                                    check.month[1] = dateNow.getMonth() + 1;
                                    check.year[0] = parseInt(dateStart.getFullYear());
                                    check.year[1] = dateNow.getFullYear();
                                    if (check.day[0] === check.day[1] && check.month[0] === check.month[1] && check.year[0] === check.year[1]) {
                                        addActivity(key, val._id, val.name, val.type, val.when.time_start, 'today');
                                    } else if (check.day[0] === check.day[1] + 1 && check.month[0] === check.month[1] && check.year[0] === check.year[1]) {
                                        addActivity(key, val._id, val.name, val.type, val.when.time_start, 'tollmorrow');
                                    }
                                }

                            }
                        }
                    }
                });
                return;
            },

            async sortAcitivy() {

                let tmpDataToday = { full_time: [], am: [], pm: [] };
                let tmpDataTollmorrow = { full_time: [], am: [], pm: [] };

                const groupTime = (activity, where) => {
                    for (let key of this.typeName) {
                        for (let item of activity[key]) {
                            if (item.time.toLowerCase() === 'full time') {
                                if (where === 'today') { 
                                    tmpDataToday.full_time.push(item);
                                } else if (where === 'tollmorrow') {
                                    tmpDataTollmorrow.full_time.push(item);
                                }
                            } else {
                                if (item.time.split(' ')[1].toLowerCase() === 'am') {
                                    if (where === 'today') { 
                                        tmpDataToday.am.push(item);
                                    } else if (where === 'tollmorrow') {
                                        tmpDataTollmorrow.am.push(item);
                                    }
                                } else if (item.time.split(' ')[1].toLowerCase() === 'pm') {
                                    if (where === 'today') { 
                                        tmpDataToday.pm.push(item);
                                    } else if (where === 'tollmorrow') {
                                        tmpDataTollmorrow.pm.push(item);
                                    }
                                }
                            }
                        }
                    }
                }

                const sortTime = (vals) => {
                    for (let i = 0; i < vals.length; i++) {
                        for (let j = i + 1; j < vals.length; j++) {
                            if (vals[i].time.split(' ')[0] > vals[j].time.split(' ')[0]) {
                                let tmp = vals[i];
                                vals[i] = vals[j];
                                vals[j] = tmp;
                            }
                        }
                    }
                    return vals;
                }

                const clearActivity = () => {
                    for (let key of this.typeName) {
                        this.activityToday[key] = [];
                        this.activityTollmorrow[key] = [];
                    }
                }

                const pushFullTimeFirst = () => {
                    let tmpDatas = [tmpDataToday, tmpDataTollmorrow];
                    for (let indexData = 0; indexData < tmpDatas.length; indexData++) {
                        for (let i = 0; i < this.getLength(tmpDatas[indexData].full_time); i++) {
                            for (let key of this.typeName) {
                                if (tmpDatas[indexData].full_time[i].type === key) {
                                    if (indexData === 0) {
                                        this.activityToday[key].push(tmpDatas[indexData].full_time[i]);
                                    } else {
                                        this.activityTollmorrow[key].push(tmpDatas[indexData].full_time[i]);
                                    }
                                }
                            }
                        }
                    }
                    tmpDatas = null;
                }

                const pushActivitys = () => {
                    let tmpDatas = [tmpDataToday, tmpDataTollmorrow];
                    for (let indexData = 0; indexData < tmpDatas.length; indexData++) {
                        for (let i = 0; i < this.getLength(tmpDatas[indexData].am); i++) {
                            for (let key of this.typeName) {
                                if (tmpDatas[indexData].am[i].type === key) {
                                    if (indexData === 0) {
                                        this.activityToday[key].push(tmpDatas[indexData].am[i]);
                                    } else {
                                        this.activityTollmorrow[key].push(tmpDatas[indexData].am[i]);
                                    }
                                }
                            }
                        }
                        for (let i = 0; i < this.getLength(tmpDatas[indexData].pm); i++) {
                            for (let key of this.typeName) {
                                if (tmpDatas[indexData].pm[i].type === key) {
                                    if (indexData === 0) {
                                        this.activityToday[key].push(tmpDatas[indexData].pm[i]);
                                    } else {
                                        this.activityTollmorrow[key].push(tmpDatas[indexData].pm[i]);
                                    }
                                }
                            }
                        }
                    }
                    tmpDatas = null;
                }

                groupTime(this.activityToday, 'today');
                groupTime(this.activityTollmorrow, 'tollmorrow');
                clearActivity();
                sortTime(tmpDataToday.am);
                sortTime(tmpDataToday.pm);
                sortTime(tmpDataTollmorrow.am);
                sortTime(tmpDataTollmorrow.pm);
                pushFullTimeFirst();
                pushActivitys();
            },

            async pushActivityShow() {
                await this.customDataShow();
                await this.convertTimeToAmPm();
                await this.sortAcitivy();
            }
        },
        async mounted() {
            document.title = 'Home | BrainPlz';
            await this.getSharingData();
            await this.getActivitys();
            await this.pushActivityShow();
          
            document.onkeydown = (evt) => {
                evt = evt || window.event;
                if (evt.keyCode == 27) { this.popupActivity.status = false; }
            };
        }
    }
    
</script>


<style scoped>

    .custom .p-scrollpanel-bar { 
        width: 4px; 
    }

</style>