<template>
    
    <LayoutAuth :statusSwap="!onSignUp" @SwapOnLayoutAuth="onMenu()">

        <div class="w-full flex flex-col items-center justify-center gap-y-8 font_prompt">
            
            <div class="w-full flex flex-col md:flex-row gap-y-8 md:gap-x-8">
                <span class="w-full p-float-label">
                    <InputText v-model.trim="form.username" type="text" 
                        @change="validationForm('username')"
                        @keyup="validationForm('username')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim"
                        :class="{
                            'border-2 border-red-500': validate.username.status
                        }"
                    />
                    <label for="username" class="first-letter:uppercase ml-1 relative">
                        username <span class="text-red-400 w-max left-20 absolute" v-if="validate.username.status">{{ validate.username.msg }}</span>
                    </label>
                </span>

                <span class="w-full p-float-label p-input-icon-right">
                    <InputText v-model="form.password" :type="!statusHiddenPassword ? 'password' : 'text'" 
                        @change="validationForm('password')"
                        @keyup="validationForm('password')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim" 
                        :class="{
                            'border-2 border-red-500': validate.password.status
                        }"
                    />
                    <label for="password" class="first-letter:uppercase ml-1 relative">
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
            
            <div class="w-full flex flex-col md:flex-row gap-y-8 md:gap-x-8">
                <span class="w-full p-float-label">
                    <InputText v-model.trim="form.name" type="text"
                        @change="validationForm('name')"
                        @keyup="validationForm('name')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim" 
                        :class="{
                            'border-2 border-red-500': validate.name.status
                        }"
                    />
                    <label for="username" class="first-letter:uppercase ml-1 relative">
                        name <span class="text-red-400 w-max left-20 absolute" v-if="validate.name.status">{{ validate.name.msg }}</span>
                    </label>
                </span>

                <span class="w-full p-float-label">
                    <InputText v-model.trim="form.surname" type="text"
                        @change="validationForm('surname')"
                        @keyup="validationForm('surname')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim" 
                        :class="{
                            'border-2 border-red-500': validate.surname.status
                        }"
                    />
                    <label for="password" class="first-letter:uppercase ml-1 relative">
                        surname <span class="text-red-400 w-max left-20 absolute" v-if="validate.surname.status">{{ validate.surname.msg }}</span>
                    </label>
                </span>
            </div>

            <div class="w-full flex flex-col md:flex-row gap-y-8 md:gap-x-8">
                <span class="w-full p-float-label">
                    <InputText v-model.trim="form.email" type="email"
                        @change="validationForm('email')"
                        @keyup="validationForm('email')"
                        class="w-full shadow-md p-3 bg-white/20 tracking-wider rounded-md border-0 font_itim" 
                        :class="{
                            'border-2 border-red-500': validate.email.status
                        }"
                    />
                    <label for="username" class="first-letter:uppercase ml-1 relative">
                        email <span class="text-red-400 w-max left-20 absolute" v-if="validate.email.status">{{ validate.email.msg }}</span>
                    </label>
                </span>
            </div>
            
        </div>

        <Button @click="onSubmit()" label="CREATE ACCOUNT" class="-mt-4 py-2.5 font-mediumm p-button-warning p-button-outlined rounded-md" />

    </LayoutAuth>

</template>

<script>
    import LayoutAuth from '@/components/user/Layout_auth';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';

    export default {
        name: 'register_page',
        components: {
            InputText, Button,
            LayoutAuth
        },
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    name: '',
                    surname: '',
                    email: ''
                },
                validate: {
                    username: { msg: '', status: false },
                    password: { msg: '', status: false },
                    name: { msg: '', status: false },
                    surname: { msg: '', status: false },
                    email: { msg: '', status: false }
                },
                statusHiddenPassword: false,
                onSignUp: false
            }
        },
        methods: {
            
            validationForm(name) {
                if (name == 'onSubmit' || name == 'username') {
                    if (this.form.username === '') {
                        this.validate.username.msg = 'is required';
                        this.validate.username.status = !false;
                    } else if (this.form.username.match(/^[a-zA-Z0-9]+$/) === null) {    
                        this.validate.username.msg = 'must be a-z, A-Z, 0-9';
                        this.validate.username.status = !false;
                    } else {
                        this.validate.username.msg = '';
                        this.validate.username.status = !true;
                    }
                } 
                
                if (name == 'onSubmit' || name == 'password') {
                    if (this.form.password === '') {
                        this.validate.password.msg = 'is required';
                        this.validate.password.status = !false;
                    } else if (this.form.password.length < 6) {
                        this.validate.password.msg = 'must be more than 6 characters';
                        this.validate.password.status = !false;
                    } else if (this.form.password.search(/[0-9]/) < 0) {
                        this.validate.password.msg = 'must contain at least one digit';
                        this.validate.password.status = !false;
                    } else {
                        this.validate.password.msg = '';
                        this.validate.password.status = !true;
                    }
                }
                
                
                if (name == 'onSubmit' ||name == 'name') {
                    if (this.form.name === '') {
                        this.validate.name.msg = 'is required';
                        this.validate.name.status = !false;
                    } else {
                        this.validate.name.msg = '';
                        this.validate.name.status = !true;
                    }
                }
                
                if (name == 'onSubmit' ||name == 'surname') {
                    if (this.form.surname === '') {
                        this.validate.surname.msg = 'is required';
                        this.validate.surname.status = !false;
                    } else {
                        this.validate.surname.msg = '';
                        this.validate.surname.status = !true;
                    }
                }

                if (name == 'onSubmit' ||name == 'email') {
                    if (this.form.email === '') {
                        this.validate.email.msg = 'is required';
                        this.validate.email.status = !false;
                    } else if (
                        this.form.email.toLowerCase()
                            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                            === null    
                        )
                    {
                        this.validate.email.msg = 'is not an email format';
                        this.validate.email.status = !false;
                    } 
                    else {
                        this.validate.email.msg = '';
                        this.validate.email.status = !true;
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
                this.$emit('swapSign', null);
            },

            onSubmit() {
                if (this.validationForm('onSubmit')) {
                    this.$emit('onSubmit', this.form);
                }
            }

        },
    }
</script>