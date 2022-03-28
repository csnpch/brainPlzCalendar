<template>
    <div>
        <div class="
            flex flex-col p-6 bg-[#2C2C2C] border-2 border-[#8A2D49] 
            font_itim text-center rounded-2xl text-white
        ">
            <p class="text-[#E37676] text-[2.5rem]">
                NOT FOUND
            </p>    
            <p class="mt-3 leading-10">
                The invitation code is not found or the invitation code has expired.&nbsp;&nbsp; 
                <br class="hidden md:block" />Please check the code you received is correct or not.
            </p>
        </div>
        <router-link to="/">
            <button class="
                font_baloo font-semibold tracking-wider bg-[#8A2D49] hover:bg-[#75263e]
                mt-4 w-full text-white duration-200 rounded-xl text-sm py-3
                "
            >
                GOT IT&nbsp;&nbsp;{{'&'}}&nbsp;&nbsp;GO BACK TO HOME PAGE
            </button>
        </router-link>
        <button 
            @click="tryAgain"
            class="
                font_baloo font-semibold tracking-wider bg-[#313964] hover:bg-[#2a3158] 
                mt-2.5 w-full text-white duration-200 rounded-xl text-sm py-3
            "
        >
            TRY AGAIN
        </button>
    </div>
</template>

<script>
    export default {
        name: 'NotFoundInvite',
        methods: {
            tryAgain() { this.$emit('tryAgain'); }
        },
    }
</script>
