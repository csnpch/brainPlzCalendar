<template>
    <div>
        <SignIn v-if="statusSwapSign" @onSubmit="submitSignIn($event)" @swapSign="swapSign()" />
        <SignUp v-if="!statusSwapSign" @onSubmit="submitSignUp($event)" @swapSign="swapSign()" />

        <Toast position="top-right" class="Toast" />
    </div>
</template>

<script>
    import axios from 'axios';
    import { provide } from 'vue';
    import store from '@/store';
    
    import SignUp from '@/components/user/SignUp';
    import SignIn from '@/components/user/SignIn';
    
    import Toast from 'primevue/toast';

    export default {
        name: 'Auth',
        components: {
            SignUp, SignIn,
            Toast
        },
        provide: {
            store
        },
        setup() {
            provide('store', store);
        },
        data() {
            return {
                statusSwapSign: true
            }
        },
        methods: {
            swapSign() {
                this.statusSwapSign = !this.statusSwapSign;
            },
            submitSignIn(data) {
                axios.post('/api/user/login', data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.$toast.add({severity:'success', summary: 'Login successfully', detail:'Now taking you to the main page...', life: 1300});
                            setTimeout(() => {
                                this.$router.push({name: 'Home'});
                            }, 1500);
                        } else { 
                            this.alertError(); 
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$toast.add({severity:'error', summary: 'Username or Password invalid.', detail:'Please check and try again !!', life: 3000});
                        } else {
                            this.alertError(); 
                        }
                    });
            },
            submitSignUp(data) {
                axios.post('/api/user/register', data)
                    .then((res) => {
                        if (res.status === 201) {
                            this.$toast.add({severity:'success', summary: 'Register successfully', detail:'Now taking you to the login...', life: 1300});
                            setTimeout(() => {
                                this.swapSign();
                            }, 1500);
                        } else {
                            this.alertError();
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$toast.add({severity:'error', summary: 'Someting data invalid.', detail:'Please check and try again !!', life: 3000});
                        } else {
                            this.alertError();
                        }
                    });
            },
            alertError() {
                this.$toast.add({
                    severity:'error', 
                    summary: 'An error occurred in the system.', 
                    detail: 'Please try again later.', 
                    life: 1300
                });
            },
        },
        mounted() {
            document.title = 'Auth | BrainPlz';
            if (store.methods.getDataUser()) {
                this.$router.push({name: 'Home'});
            }
        },
    }

</script>