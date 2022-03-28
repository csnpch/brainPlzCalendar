<template>
    <div 
        class="fixed w-full h-screen top-0 left-0"
    >
        <div class="
            z-10 -mt-10 w-11/12 md:w-5/12 xl:w-3/12 bg-[#2C2C2C] text-white p-6 pt-7 rounded-lg
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <!-- <button @click="onClose">
                <i class="absolute top-4 right-4 far fa-times-circle text-lg
                        cursor-pointer hover:text-red-400 duration-100"
                ></i>
            </button> -->
            <p class="relative font_baloo w-full text-center font-medium text-xl">
                Detail attending of&nbsp;&nbsp;“&nbsp;&nbsp;{{data.name}}&nbsp;&nbsp;”
            </p>
            <div class="mt-8 flex flex-col gap-4">
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Code invite  :</span>
                    <span class="text-[#F3D014]">{{data.code}}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Owner  :</span>
                    <span class="text-[#F3D014]">{{data.owner.name}}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Total members :</span>
                    <span class="text-[#F3D014]">{{data.members.toLocaleString('th-TH')}}</span>
                </div>
                <div class="font_itim gap-2 grid grid-cols-[3fr_4fr]">
                    <span class="text-right">Total activity  :</span>
                    <span class="text-[#F3D014]">{{data.activitys.toLocaleString('th-TH')}}</span>
                </div>
            </div>
            <div class="mt-10 flex flex-row gap-2 text-sm select-none">
                <button v-if="data.owner.status"
                    @click="onDestroy(1)"
                    class="font_itim w-full rounded-lg py-2 bg-[#C14D46] hover:bg-[#a7403a]"
                >
                    DELETE THIS
                </button>
                <button v-if="!data.owner.status"
                    @click="onDestroy(2)"
                    class="font_itim w-full rounded-lg py-2 bg-[#C14D46] hover:bg-[#a7403a]"
                >
                    UNREGISTER THIS
                </button>
                <button 
                    @click="onClose()"
                    class="font_itim w-full rounded-lg py-2 bg-[#2C73B4] hover:bg-[#2767a3]"
                >
                    CLOSE
                </button>
            </div>
        </div>
        <div @click="onClose()" class="z-0 overlay w-full h-full bg-black opacity-30"></div>
        <ConfirmDialog position="top"></ConfirmDialog>
    </div>
</template>

<script>
    import ConfirmDialog from 'primevue/confirmdialog';

    export default {
        name: 'PopupAttending',
        components: {
            ConfirmDialog
        },
        props: {
            data: {
                required: true
            }
        },
        methods: {
            onClose() {
                this.$emit('onClose');
            },
            onEdit() {
                this.$emit('onEdit');
            },
            onDestroy(where) {
                this.$confirm.require({
                    message: 'Are you sure you want to proceed?',
                    header: 'Confirmation',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        switch (where) {
                            case 1:
                                this.$emit('onDelete', this.data);
                                this.onClose();
                                return;
                            case 2:
                                this.$emit('onUnRegister', this.data)
                                this.onClose();
                                return;
                        }
                    },
                    reject: () => { return; }
                });
            },
        },
        mounted() {
        },
    }
</script>
