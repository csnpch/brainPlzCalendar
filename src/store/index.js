import { reactive } from 'vue';
import axios from 'axios';

var pass = () => {};

const state = reactive({
    dataUser: null,
    dataSharing: {
        status: false
    },
    dataActivity: null
});

const methods = {
    
    async getDataUserOnDb() { 
        await axios.get('/api/user/self').then(res => {
            this.setDataUser(res.data);    
        }).catch(err => {
            console.log(err);
        })
        return state.dataUser;
    },

    getDataUser() { return state.dataUser; },
    setDataUser(data) { state.dataUser = data; },
    
    async getDataSharing() {
        await axios.get(`/api/share/creator/${state.dataUser._id}`).then(res => {
            this.setDataSharing(res.data);
        }).catch(err => { console.log(err) });
        return state.dataSharing;
    },
    setDataSharing(data) { state.dataSharing = data; },

    async getDataActivity(status) { 
        if (!status) if (state.dataActivity) return state.dataActivity;
        await axios.get('/api/activity/').then(res => {
            this.setDataActivity(res.data);
        }).catch(err => { console.log(err) });
        return state.dataActivity;
    },
    async findDataActivity(id) {
        if (!state.dataActivity) return null;
        return state.dataActivity.find(data => data._id == id);
    },
    setDataActivity(data) { state.dataActivity = data; },
    pushDataActivity(data) { try { state.dataActivity.unshift(data); } catch(err) { pass() } },
    deleteDataActivity(id) { state.dataActivity = state.dataActivity.filter(item => item._id !== id); },

}

// const getters = {
//     counterSquared() {
//         return state.counter * state.counter;
//     }
// }

export default {
    state,
    methods,
    // getters
}
