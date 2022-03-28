<template>
    
    <LayoutAuth :statusSwap="!onSignIn" @SwapOnLayoutAuth="onMenu()" @keypress.enter="onSubmit()">
        
        <div class="w-full flex flex-col items-center justify-center gap-y-8 font_prompt">
            
            <div class="w-full flex flex-col gap-y-8 md:gap-x-8">
                <span class="w-full p-float-label">
                    <InputText 
                        v-model.trim="form.username" type="text" 
                        @change="validationForm('username')"
                        @keyup="validationForm('username')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim" 
                        :class="{
                            'border-2 border-red-500': validate.username.status
                        }"
                    />
                    <label for="username" class="first-letter:uppercase ml-1 select-none">
                        username <span class="text-red-400 w-max left-20 absolute" v-if="validate.username.status">{{ validate.username.msg }}</span>
                    </label>
                </span>

                <span class="w-full p-float-label p-input-icon-right">
                    <InputText 
                        v-model="form.password" :type="!statusHiddenPassword ? 'password' : 'text'" 
                        @change="validationForm('password')"
                        @keyup="validationForm('password')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim"
                        :class="{
                            'border-2 border-red-500': validate.password.status
                        }" 
                    />
                    <label for="password" class="first-letter:uppercase ml-1 select-none">
                        password <span class="text-red-400 w-max left-20 absolute" v-if="validate.password.status">{{ validate.password.msg }}</span>
                    </label>
                    <i  @click="statusHiddenPassword = !statusHiddenPassword"
                        class="pi mr-2 cursor-pointer" 
                        :class="{
                            'pi-eye': !statusHiddenPassword,
                            'pi-eye-slash': statusHiddenPassword
                        }"
                    />
                </span>
            </div>
            
        </div>

        <Button @click="onSubmit()" label="SIGN IN" class="-mt-4 py-2.5 font-mediumm p-button-warning p-button-outlined rounded-md" />

    </LayoutAuth>

</template>

<script>
    import LayoutAuth from '@/components/user/Layout_auth';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';

    export default {
        name: 'user_signIn',
        components: {
            InputText, Button,
            LayoutAuth
        },
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                validate: {
                    username: { msg: '', status: false },
                    password: { msg: '', status: false }
                },
                statusHiddenPassword: false,
                onSignIn: true
            }
        },
        methods: {

            validationForm(name) {
                if (name == 'onSubmit' || name == 'username') {
                    if (this.form.username === '') {
                        this.validate.username.msg = 'is required';
                        this.validate.username.status = !false;
                    } else {
                        this.validate.username.msg = '';
                        this.validate.username.status = !true;
                    }
                } 
                
                if (name == 'onSubmit' ||name == 'password') {
                    if (this.form.password === '') {
                        this.validate.password.msg = 'is required';
                        this.validate.password.status = !false;
                    } else {
                        this.validate.password.msg = '';
                        this.validate.password.status = !true;
                    }
                }
                
                let statusCheck = true; 
                for (let key in this.validate) {
                    if (this.validate[key].status) {
                        statusCheck = false;
                        break;
                    } 
                }
                return statusCheck;
            },
            
            onMenu() {
                this.$emit('swapSign', this.form);
            },
            
            onSubmit() {
                if (this.validationForm('onSubmit')) {
                    this.$emit('onSubmit', this.form);
                }
            }

        }
    }
</script>