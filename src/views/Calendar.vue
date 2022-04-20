<template>
    <Layout>
        <div class="smoothShow container mx-auto flex justify-center items-start h-full font_baloo font-semibold">
            <FullCalendar 
                :options="calendarOptions" 
                :selectable="true"
                :timeZone="'Asia/Bangkok'"
                class="mt-5 h-[80vh] w-11/12 md:w-9/12" 
            />
        </div>
        <input v-model="activityOnClick_id" type="text" class="hidden absolute" id="id_activity">
        
        <div v-if="statusPopup" class="
            smoothShow
            -mt-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            z-20 text-center bg-[#2C2C2C] rounded-2xl py-8 px-6 font_baloo
        ">
            <p class="text-xl font-bold">Detail activity</p>
            <div class="grid grid-cols-[60px_20px_1fr] text-left mx-4 mt-6"
                :class="{
                    'min-w-[26vh]': activityShow.when.length > 16,
                    'min-w-[18vh]': activityShow.when.length <= 16
                }"
            >
                <span class="font-semibold">Name</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200">{{ activityShow.name }}</span>
                
                <span class="font-semibold">Type</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200 first-letter:uppercase">{{ activityShow.type }}</span>

                <span class="font-semibold">Detail</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200 first-letter:uppercase">{{ activityShow.detail }}</span>

                <span class="font-semibold">Where</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200 first-letter:uppercase">{{ activityShow.where }}</span>
                
                <span class="font-semibold">When</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200">{{ activityShow.when }}</span>

                <span class="font-semibold">Time</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200">{{ activityShow.time }}</span>
                
                <span class="font-semibold">Owner</span>
                <span class="font-semibold text-left">:</span>
                <span class="text-yellow-200">{{ activityShow.creator }}</span>
            </div>
            <div
                v-if="activityShow.myActivity"
                class="flex flex-row justify-center items-center gap-x-2"
            >
                <div
                    @click="onDelete(activityShow)"
                    class="
                        text-center mt-4 -mb-4 w-full bg-orange-700/80 rounded-lg py-1.5 pt-2 text-sm tracking-wide
                        font_baloo text-white hover:bg-orange-800/80 cursor-pointer duration-200 font-semibold
                    "   
                >
                    DELETE
                </div>
            </div>
            <div
                v-if="!activityShow.myActivity"
                @click="onUnJoin(activityShow)"
                class="
                    text-center mt-4 -mb-4 w-full bg-orange-700 rounded-lg py-2 pt-2.5 text-sm tracking-wide
                    font_baloo text-white hover:bg-orange-800 cursor-pointer duration-200 font-semibold
                "
            >
                UNJOIN EVENT
            </div>
            <ConfirmPopup class="ml-4 md:ml-12 md:w-52"></ConfirmPopup>
        </div>

        <div v-if="statusPopup" @click="onClosePopup()" class="showSmooth3 fixed top-0 z-10 overlay w-full h-full bg-black opacity-30"></div>
        
        <Toast position="top-right" class="Toast" />
    
    </Layout>
</template>


<script>

    import { provide } from 'vue';
    import store from '@/store';
    import axios from 'axios';
    
    import Layout from '@/components/user/Layout';
    import ConfirmPopup from 'primevue/confirmpopup';
    import Toast from 'primevue/toast';

    import '@fullcalendar/core';
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';

    export default {
        name: 'Calender',    
        components: {
            Layout, FullCalendar,
            ConfirmPopup, Toast
        },
        provide: {
            store
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                statusPopup: false,
                activityOnClick_id: '',
                calendarOptions: {
                    timeZone: 'Asia/Bangkok',
                    plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
                    initialDate : new Date(),
                    headerToolbar: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'today'
                    },
                    editable: false,
                    selectable: false,
                    selectMirror: true,
                    dayMaxEvents: true,
                    events: [],
                    eventClick: (info) => {
                        document.getElementById('id_activity').value = info.event.id;
                    },
                },
                dataActivitys: [],
                activityShow: {
                    _id: '-',
                    name: '-',
                    type: '-',
                    detail: '-',
                    where: '-',
                    when: '-',
                    time: '-',
                    creator: '-',
                    myActivity: false
                },
                dataEventsOnSharing: []
            };
        },
        methods: {

            async pushActivityShowOnClick() {
                for (let key in this.activityShow) { this.activityShow[key] = '-'; }

                let when = null;
                let date = [null, null]
                let time = null;
                let checkRange = false;
                let creator = '';

                let tmpActivitys = this.dataActivitys;
                for (let item of this.dataEventsOnSharing) {
                    tmpActivitys.push(item);
                }
                for (let item of tmpActivitys) {
                    if (item._id === this.activityOnClick_id) {
                        checkRange = false;
                        creator = '-';
                        
                        if (await store.methods.getDataUser()._id === item.creator) {
                            creator = 'You';
                        } else {
                            creator = await axios.get(`/api/user/getNameUser/${item.creator}`).then(res => res.data);
                        }
                        date[0] = new Date(item.when.date[0]);
                        date[1] = new Date(item.when.date[1]);
                        when = date[0].getDate() + '/' + (date[0].getMonth() + 1) + '/' + date[0].getFullYear();
                        if (item.when.date[1]) {
                            when += ' - ' + (date[1].getDate()) + '/' + (date[1].getMonth() + 1) + '/' + date[1].getFullYear();
                            checkRange = true;
                        }

                        if (item.when.time_start === 'full_time') {
                            time = 'Full day';
                        } else {
                            if (checkRange) {
                                time = `
                                    Start - ${new Date(item.when.time_start).toISOString().substr(11, 5)}
                                    , End - ${new Date(item.when.time_end).toISOString().substr(11, 5)}
                                `;
                            } else {
                                time = `
                                    ${new Date(item.when.time_start).toISOString().substr(11, 5)} 
                                    - ${new Date(item.when.time_end).toISOString().substr(11, 5)}
                                `;
                            }
                        }

                        this.activityShow._id = item._id;
                        this.activityShow.name = item.name;
                        this.activityShow.type = item.type;
                        this.activityShow.detail = item.detail || '-';
                        this.activityShow.where = item.where || '-';
                        this.activityShow.when = when;
                        this.activityShow.time = time;
                        this.activityShow.creator = creator;
                        this.activityShow.myActivity = item.creator === await store.methods.getDataUser()._id;
                        break;
                    }
                }
            },

            watchActivityOnClick() {
                const interval = setInterval(() => {
                    try {
                        if (this.activityOnClick_id !== document.getElementById('id_activity').value) {
                            this.activityOnClick_id = document.getElementById('id_activity').value;
                            this.pushActivityShowOnClick();
                            this.statusPopup = !this.statusPopup;
                        }
                    } catch (err) { clearInterval(interval); }
                }, 500);
            },

            async getActivitys() {
                this.dataActivitys = await store.methods.getDataActivity(1);
            },
            
            async pustToCalender() {
                
                let tmpDate = ['', ''];
                
                const dataAcceptEventsUser = await store.methods.getDataUser().acceptEvent;

                for (let item of dataAcceptEventsUser) {
                    tmpDate = ['', ''];
                    await axios.get(`/api/activity/findOne/${item}`).then(res => {
                        if (res.status === 200 && res.data) {
                            this.dataEventsOnSharing.push(res.data);
                            this.dataActivitys.push(res.data);
                        }
                    });
                }

                this.dataActivitys = this.dataActivitys.filter((item, index, self) =>
                    index === self.findIndex((activity) => ( activity._id === item._id ))
                );

                const addZeroFront = (val) => {
                    if (val.toString().length === 1) {
                        return '0' + val;
                    }
                    return val;
                };

                for (let val of this.dataActivitys) {
                    tmpDate = ['', ''];
                    console.log(val.name)
                    try {
                        tmpDate[0] = new Date(val.when.date[0]);
                        tmpDate[0] = `${tmpDate[0].getFullYear()}-${addZeroFront(tmpDate[0].getMonth() + 1)}-${addZeroFront(tmpDate[0].getDate())}`; 
                        tmpDate[1] = new Date(val.when.date[1]);
                        tmpDate[1] = `${tmpDate[1].getFullYear()}-${addZeroFront(tmpDate[1].getMonth() + 1)}-${addZeroFront(tmpDate[1].getDate() + 1)}`; 
                    } catch (err) { err }
                    this.calendarOptions.events.push({
                        id: val._id,
                        title: val.name,
                        start: val.when.date !== null ? tmpDate[0] : null,
                        end: val.when.date !== null ? (tmpDate[1] !== null ? tmpDate[1] : null) : null,
                        color: (val.type === 'work' ? '#a62400' : (val.type === 'event' ? '#004e8a' : '#135400')),
                        textColor: '#fff'
                    });
                }
            },

            onClosePopup() {
                this.activityOnClick_id = '-'
                document.getElementById('id_activity').value = '-';
                this.statusPopup = false;
            },

            onEdit(val) {
                this.$router.push({name: 'EditActivity', params: { id: val._id }});
            },

            async onUnJoin(val) {
                this.$confirm.require({
                    target: event.currentTarget,
                    message: 'Are you sure?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: async () => {
                        this.onClosePopup();
                        await axios.post(`/api/user/unJoinEvent/${val._id}`)
                            .then(async (res) => {
                                if (res.status === 200) {
                                    this.$toast.add({
                                        severity:'success', 
                                        summary: 'Unjoin event success.', 
                                        detail: '', 
                                        life: 1300
                                    });
                                    this.calendarOptions.events = this.calendarOptions.events.filter(item => item.id !== val._id);
                                }
                            }).catch(err => { console.log(err); })
                    },
                    reject: () => { }
                });
            },

            async onDelete(val) {
                this.$confirm.require({
                    target: event.currentTarget,
                    message: 'Are you sure?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: async () => {
                        await axios.post('/api/activity/delete', { activity_id: val._id })
                        store.methods.deleteDataActivity(val._id);
                        this.onClosePopup();
                        this.$toast.add({
                            severity:'success', 
                            summary: 'Delete success.', 
                            detail: '', 
                            life: 1300
                        });
                        this.calendarOptions.events = this.calendarOptions.events.filter(item => item.id !== val._id);
                    },
                    reject: () => { }
                });
            }

        },
        async mounted() {
            document.title = 'Calender | BrainPlz';
            this.watchActivityOnClick();
            await this.getActivitys();
            await this.pustToCalender();
            document.onkeydown = (evt) => {
                evt = evt || window.event;
                if (evt.keyCode == 27) { 
                    this.onClosePopup();
                }
            };
        },
    }

</script>


<style scoped>

    ::v-deep(.fc-button) {
        font-size: 14px !important;
    }

    ::v-deep(.fc-header-toolbar) {
        margin-bottom: 10px !important;
    }

    .fc-daygrid-day-events,
    .fc-event-main-frame,
    .fc-daygrid-event-harness,
    .fc-event-title-container {
        cursor: pointer !important;
    }

    @media screen and (max-width: 960px) {
        ::v-deep(.fc-header-toolbar) {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px !important;
        }

        ::v-deep(.fc-toolbar-title) {
            margin-top: 6px;
        }
    }
</style>