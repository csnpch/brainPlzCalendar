<template>
    <Layout>
        <div class="smoothShow container mx-auto flex justify-center items-start h-full font_baloo font-semibold">
            <FullCalendar 
                :options="calendarOptions" 
                :selectable="true"
                class="mt-5 h-[80vh] w-11/12 md:w-9/12" 
            />
            <input v-model="activityOnClick_id" type="text" class="hidden absolute" id="id_activity">
        </div>
        
        <Popup v-if="false" />

    </Layout>

</template>


<script>

    import { provide } from 'vue';
    import store from '@/store';
    
    import Layout from '@/components/user/Layout';
    import Popup from '@/components/activity/Popup';

    import '@fullcalendar/core';
    import FullCalendar from '@fullcalendar/vue3';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';

    export default {
        name: 'Calender',    
        components: {
            Layout, FullCalendar,
            Popup
        },
        provide: {
            store
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                activityOnClick_id: null,
                calendarOptions: {
                    plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
                    initialDate : new Date(),
                    headerToolbar: {
                        left: 'prev, next today',
                        center: 'title',
                        right: 'dayGridMonth, timeGridWeek, timeGridDay'
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
            };
        },
        methods: {

            watchActivityOnClick() {
                const interval = setInterval(() => {
                    try {
                        this.activityOnClick_id = document.getElementById('id_activity').value;
                    } catch (err) {
                        clearInterval(interval);
                    }
                }, 1000);
            },
            
            async getActivitys() {
                this.dataActivitys = await store.methods.getDataActivity();
            },
            
            async pustToCalender() {
                for (let val of this.dataActivitys) {
                    this.calendarOptions.events.push({
                        id: val._id,
                        title: val.name,
                        start: val.when.date !== null ? val.when.date[0] : null,
                        end: val.when.date !== null ? (val.when.date[1] !== null ? val.when.date[1] : null) : null,
                    });
                }
            }
        },
        async mounted() {
            document.title = 'Calender | BrainPlz';
            this.watchActivityOnClick();
            await this.getActivitys();
            await this.pustToCalender();
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