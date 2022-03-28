<template>
    <div>
        <div class="
            flex flex-col p-6 bg-[#2C2C2C] border-2 border-[#a44aff] 
            font_itim text-center rounded-2xl text-white
        ">
            <p class="mb-11">
                JOIN SHARING GROUP
            </p>    
            <p class="text-[#7FE376] text-[2.5rem]">
                {{ data.invite.name }}
            </p>
            <div class="text-sm">
                <p v-if="data.invite.detail" class="text-[#55F2E9]">
                    ' {{ data.invite.detail }} '
                </p>
                <p class="mt-2">
                    {{ countObject(data.invite.members) }} peoples joined.
                </p>
            </div>    
            <p class="mt-12  text-sm">
                Group sharing by " {{ data.creator.name }} "
            </p>    
        </div>
        <button 
            @click="onJoin"
            class="
                font_baloo font-semibold tracking-wider bg-[#8932e0] hover:bg-[#792fc4]
                mt-4 w-full text-white duration-200 rounded-xl text-sm py-3
            "
        >
            JOIN
        </button>
        <router-link to="/">
            <button 
                class="
                    font_baloo font-semibold tracking-wider bg-[#313964] hover:bg-[#2a3158] 
                    mt-2.5 w-full text-white duration-200 rounded-xl text-sm py-3
                "
            >
                IGNORE
            </button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'JoinAttending',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        methods: {
            countObject(obj) {
                return Object.keys(obj).length;
            },
            onJoin() {
                this.$emit('onJoin', {public_key: this.data.invite.public_key, creator: this.data.creator.id});
            }
        },
        mounted() {
            console.log(this.data);
        },
    }
</script>