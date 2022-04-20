const activityModel = require('./../models/activity');
const { countMembersInActivity } = require('./../controllers/user');
// const config = require('./../configs/');

const getActivitys = async (userId = null) => {
    const activitys = await activityModel.find({ creator: userId }).sort({ createdAt: -1 });
    return activitys;
};

const getActivityById = async (activityId = null) => {
    const activity = await activityModel.findOne({ _id: activityId });
    return activity;
};

const getActivitysByPublicKey = async (publicKey = null) => {
    const activitys = await activityModel.find({
        'access_rights.public_key': publicKey
    });
    return activitys;
};

const countMembers = async (activity_id) => {
    const countMembers = await countMembersInActivity(activity_id);
    return countMembers;
};

const searchActivitys = async (keyword = null, userId = null) => {
    
    // search by name and creator
    const activitys = await activityModel.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { type: { $regex: keyword, $options: 'i' } },
            // { everyOption: { $regex: keyword, $options: 'i' } },
            { "access_rights.value": { $regex: keyword, $options: 'i' } },
        ],
        $and: [
            { creator: userId }
        ]
    }).sort({ createdAt: -1 });
    
    return activitys;
};


const createActivity = async (docs = {}, sessionUser = null) => {

    const insertDocs = docs.form;
    insertDocs.creator = sessionUser._id;
    
    let newActivity = new activityModel(insertDocs);
    await newActivity.save();

    return newActivity;
};


const updateActivity = async (activityId = null, data = null) => {
    const activity = await activityModel.findByIdAndUpdate(activityId, data, { new: true });
    return activity;
};


const deleteActivity = async (activityId = null) => {
    const activity = await activityModel.findById(activityId);
    await activity.remove();
    return activity;
};

module.exports = {
    createActivity,
    getActivitys,
    getActivityById,
    searchActivitys,
    getActivitysByPublicKey,
    updateActivity,
    deleteActivity,
    countMembers
}
