<template>
    <div>
        <PopupAttending 
            :class="{'hidden': !statusPopup}" 
            :data="dataPopup" 
            @onDelete="onDeleteAttending($event)"
            @onUnRegister="onUnregisterAttending($event)" 
            @onClose="onClosePopup()" 
        />
        <div v-if="checkDataAttending()" class="h-min text-white bg-[#2C2C2C] p-6 rounded-2xl">
            <div class="flex flex-col md:flex-row gap-y-2 justify-between font_itim mb-4 ml-2 -mt-1.5">
                <p class="tracking-wider text-lg">
                    You are attending
                </p>
                <div class="flex flex-row items-center md:mr-3 gap-2 text-sm">
                    <div class="w-3 h-3 rounded-xl bg-[#9C403B]"></div>
                    <span>You</span>
                    <div class="w-3 h-3 rounded-xl bg-[#4e57a1]"></div>
                    <span>Anoter</span>
                </div>
            </div>
            <div class="w-full flex flex-col gap-y-2 text-sm">
                <div 
                    v-for="item in dataAttendings" :key="item.code"
                    class="
                        w-full flex justify-between pt-3 pb-2 md:pt-3.5 md:pb-2.5 
                        px-5 rounded-lg cursor-pointer
                        duration-300 font_baloo
                    "
                    :class="{
                        'bg-[#9C403B] hover:bg-[#853733]': item.owner.status == 1,
                        'bg-[#474E90] hover:bg-[#3b417a]': item.owner.status != 1
                    }"
                    @click="sendDataToPopup(item)"
                >
                    <p class=" tracking-wider">
                        {{item.name}}
                    </p>
                    <p class=" tracking-wider">
                        {{ item.members.toLocaleString('th-TH') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import { provide } from 'vue';
    import store from '@/store';
    import axios from 'axios';

    import PopupAttending from '@/components/attending/Popup.vue';

    export default {
        name: 'AttendingList',
        components: {
            PopupAttending
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                statusPopup: false,
                dataPopup: {code:'',name:'',members:0,owner:{status:0,name:''},activitys:0},
                dataAttendings: []
            }
        },
        methods: {
            sendDataToPopup(data) {
                this.statusPopup = !this.statusPopup;
                this.dataPopup = data;
            },
            
            onClosePopup() {
                this.statusPopup = !this.statusPopup;
            },

            checkDataAttending() {
                return this.dataAttendings.length > 0;
            },

            async onUnregisterAttending(data) {
                console.log('onUnregisterAttending working! = ', data);
                await axios.post('/api/share/unregister', { public_key: data.public_key })
                    .then(async (res) => {
                        await store.methods.getDataUserOnDb();
                        await this.setDataToShow();
                        console.log('onUnregisterAttending success = ', res);
                    }).catch(err => {
                        console.log('onUnregisterAttending Failed = ', err);
                    })
            },
            
            async setDataToShow() {
                
                let myShare = await store.methods.getDataSharing();
                this.dataAttendings = [];

                for (let val of myShare.sharings) {
                    if (val) {
                        this.dataAttendings.push({
                            public_key: val.public_key,
                            code: val.code,
                            name: val.name,
                            owner: {
                                status: (val.creator) ? 0 : 1,
                                name: (val.creator) ? val.creator.name : await store.methods.getDataUser().name,
                            },
                            members: val.members.length,
                            activitys: val.activitys.length
                        });
                    } 
                }

            },
            
            async onDeleteAttending(event) {

                await axios.delete(`/api/share/public_key=${event.public_key}`)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res.data);
                        }
                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        this.setDataToShow();
                    });
            
            }
        },
        async mounted() {
            await this.setDataToShow();
            document.onkeydown = (evt) => {
                evt = evt || window.event;
                if (evt.keyCode == 27) { this.statusPopup = false; }
            };
        }
    }
</script>