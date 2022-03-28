const mongoose = require('mongoose');

const collection = 'share';

const shareSchema = mongoose.Schema({
    
    creator: { type: String, require: false },
    
    sharings: { 
        type: Array, 
        default: []
    },

    // public_activitys: {
    //     type: Array,
    //     default: []
    // }

}, {
    timestamps: true,
    versionKey: false,
    collection
});

module.exports = mongoose.model(collection, shareSchema);