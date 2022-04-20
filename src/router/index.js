import store from './../store';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const routes = [
    {
        path: '/auth', name: 'Auth', 
        component: () => import('../views/Auth.vue')
    },
    {
        path: '/', name: 'Home', 
        meta: { auth: true },
        component: () => import('../views/Home.vue')
    },
    {
        path: '/calendar/', name: 'Calendar', 
        meta: { auth: true },
        component: () => import('../views/Calendar.vue')
    },
    {
        path: '/share/', name: 'MainShare',
        meta: { auth: true },
        component: () => import('../views/Share/Main.vue')
    },
    {
        path: '/share/create', name: 'CreateShare',
        meta: { auth: true },
        component: () => import('../views/Share/Create.vue')
    },
    {
        path: '/activity', name: 'Activity', 
        meta: { auth: true },
        component: () => import('../views/Activity/Main.vue')
    },
    {
        path: '/activity/add', name: 'AddActivity', 
        meta: { auth: true },
        component: () => import('../views/Activity/Create.vue')
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

//! check auth to view page
router.beforeEach((to, from, next) => {
    if (!to.meta.auth) return next();
    axios.get('/api/user/getSession').then(res => {
        if (res.data) {
            store.methods.setDataUser(res.data);
            return next();
        } else { 
            router.push({name:'Auth'});
        }
    });
});

export default router;
