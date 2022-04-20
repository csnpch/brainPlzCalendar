<template>
    <div 
        class="fixed w-full h-screen top-0 left-0"
    >
        <div class="
            z-10 -mt-10 w-11/12 md:w-5/12 xl:w-3/12 bg-[#2C2C2C] text-white rounded-lg
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 pb-14"
        >
            <button @click="onClose()">
                <i class="absolute top-4 right-4 far fa-times-circle text-lg
                        cursor-pointer hover:text-red-400 duration-100"
                ></i>
            </button>
            <p class="relative font_baloo w-full text-center font-medium text-xl">
                “&nbsp;&nbsp;<span class="text-purple-200">{{ itemActivity.name }}</span>&nbsp;&nbsp;”
            </p>
            <div class="mt-8 flex flex-col gap-4">
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Time :</span>
                    <span class="text-[#F3D014]">{{ getTextShow(itemActivity.when, 'time') }}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Date :</span>
                    <span class="text-[#F3D014]">{{ getTextShow(itemActivity.when, 'date') }}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Where :</span>
                    <span class="text-[#F3D014]">{{ itemActivity.where || '-' }}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Detail :</span>
                    <span class="text-[#F3D014]">{{ itemActivity.detail || '-' }}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Owner  :</span>
                    <span class="text-[#F3D014]">{{ itemActivity.nameCreator }}</span>
                </div>
            </div>
            <div 
                v-if="itemActivity.notJoinEvent" 
                @click="onJoinEvent(itemActivity)"
                class="text-center mt-8 -mb-8 w-full bg-purple-800 rounded-lg py-2 pt-2.5 text-sm tracking-wide
                font_baloo text-white hover:bg-purple-900 cursor-pointer duration-200 font-semibold"
            >
                JOIN EVENT
            </div>
            <div
                v-if="itemActivity.onJoinEvnet"
                @click="onUnJoin(itemActivity)"
                class="text-center mt-8 -mb-8 w-full bg-orange-700 rounded-lg py-2 pt-2.5 text-sm tracking-wide
                font_baloo text-white hover:bg-orange-800 cursor-pointer duration-200 font-semibold"
            >
                UNJOIN EVENT
                <ConfirmPopup class="ml-28 md:ml-72 md:w-52"></ConfirmPopup>
            </div>
        </div>

        <div @click="onClose()" class="z-0 overlay w-full h-full bg-black opacity-30"></div>

    </div>

</template>

<script>
    import ConfirmPopup from 'primevue/confirmpopup';

    export default {
        name: 'cpn_PopupActivity',
        components: {
            ConfirmPopup
        },
        props: {
            activity: {
                type: Object,
                default: () => {
                    return null;
                }
            },
            acceptEvent: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                itemActivity: {
                    name: '',
                    time: '',
                    when: '',
                    where: '',
                    detail: '',
                    owner: ''
                }
            }
        },
        methods: {
            onClose() {
                this.$emit('closePopup');
            },
            getTextShow(val, where) {
                if (where === 'date') {
                    if (val.day === null) {
                        let date_start = new Date(val.date[0]);
                        let date_stop = (val.date[1]) ? new Date(val.date[1]) : '';
                        if (date_start.toString().length > 0) {
                            date_start =  date_start.getDate() + '/' + (date_start.getMonth() + 1) + '/' + date_start.getFullYear();
                        }
                        if (date_stop.toString().length > 0) {
                            date_stop = date_stop.getDate() + '/' + (date_stop.getMonth() + 1) + '/' + date_stop.getFullYear();
                        }
                        return date_start + (date_stop.length > 0 ? ' - ' + date_stop : '');
                    } else {
                        try {
                            return val.day.name;
                        } catch (err) { err }
                        return '-';
                    }
                } else if (where === 'time') {
                    if (val.time_start === 'full_time') {
                        return 'Full day'
                    } else {
                        // return hour:minutes - hour:minutes if time_end is null return hour:minutes time start only
                        let time_start = new Date(val.time_start);
                        let time_stop = (val.time_end) ? new Date(val.time_end) : '';
                        if (time_start.toString().length > 0) {
                            time_start = time_start.getHours() + ':' + time_start.getMinutes();
                        }
                        if (time_stop.toString().length > 0) {
                            time_stop = time_stop.getHours() + ':' + time_stop.getMinutes();
                        }

                        time_start = time_start.split(':');
                        for (let i = 0; i < time_start.length; i++) {
                            if (time_start[i].length === 1) {
                                time_start[i] = '0' + time_start[i];
                            }
                        }
                        time_start = time_start.join(':');

                        time_stop = time_stop.split(':');
                        for (let i = 0; i < time_stop.length; i++) {
                            if (time_stop[i].length === 1) {
                                time_stop[i] = '0' + time_stop[i];
                            }
                        }
                        time_stop = time_stop.join(':');

                        return time_start + (time_stop.length > 0 ? ' - ' + time_stop : '');
                    }
                }
            },
            onJoinEvent(val) {
                this.$emit('onJoinEvent', val);
            },
            onUnJoin(val) {
                this.$confirm.require({
                    target: event.currentTarget,
                    message: 'Are you sure?',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.$emit('onUnJoin', val);
                    },
                    reject: () => { }
                });
            },
            async setData() {
                this.itemActivity = this.activity;
            },
        },
        async mounted() {
            await this.setData();
        },

    }
</script>