const mongoose = require('mongoose');

const collection = 'user';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    token: { type: String },
    joinShares: { type: Array },
    acceptEvent: { type: Array },
    blockShares: { type: Array },
}, {
    timestamps: true,
    versionKey: false,
    collection
});

module.exports = mongoose.model(collection, userSchema);