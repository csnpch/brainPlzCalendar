<template>
    
    <div class="w-full h-screen"> 
        
        <div
            class="
                bg-[url('https://images.unsplash.com/photo-1527219525722-f9767a7f2884?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80')]
                bg-cover blur-sm opacity-50 duration-500 bg-left-bottom
                w-full h-full z-0 
            "
        ></div>

        <div class=
            "
                z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 
                -translate-y-[20rem] md:-translate-y-[15rem]
            "
        >
            <div 
                class="flex flex-col gap-y-10 w-[16rem]"
                :class="{
                    'md:w-[46rem]': statusSwap,
                    'md:w-[24rem]': !statusSwap            
                }"
            >

                <div class="flex justify-center gap-x-4 select-none">
                    <p @click="onMenu()" 
                        class="w-fit cursor-pointer text-center text-white/90 font_itim"
                        :class="{
                            'border-b-2 border-white border-opacity-60 text-2xl': !statusSwap,
                            'text-md mt-2.5': statusSwap,
                        }"
                    >
                        SIGN IN
                    </p>
                    <p  @click="onMenu()"
                        class="w-fit cursor-pointer text-center text-white/90 font_itim"
                        :class="{
                            'border-b-2 border-white border-opacity-60 text-2xl': statusSwap,
                            'text-md mt-2.5': !statusSwap,
                        }"
                    >
                        SIGN UP
                    </p>
                </div>

                <slot></slot>

            </div>
        </div>

    </div>

</template>

<script>
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';

    export default {
        name: 'register_page',
        components: {
            InputText, Button
        },
        props: {
            statusSwap: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                value: '',
                statusHiddenPassword: false
            }
        },
        watch: {
        },
        methods: {
            onMenu() {
                this.$emit('SwapOnLayoutAuth');
            }
        },
    }
</script>