const mongoose = require('mongoose');

const collection = 'activity';

const activitySchema = mongoose.Schema({
    
    name: { type: String, required: true },
    type: { type: Object, required: true },
    where: String,
    detail: String,
    creator: { type: String, required: true },
    
    when: {
        type: Object, 
        required: true,
        default: {
            time_start: '00:00',
            time_end: '00:00',
            date: null,
            day: null,
        }
    },
    
    // everyOption: {
    //     type: Object,
    //     default: null
    // },
    
    access_rights: {
        type: Object,
        required: true,
        default: {
            value: 'private',  // 'sharing' // 'public'
            public_key: []
        }
    },
    
    members: {
        type: Array,
        default: []
    } // id users join events

}, {
    timestamps: true,
    versionKey: false,
    collection
});

module.exports = mongoose.model(collection, activitySchema);