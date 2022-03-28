const activityModel = require('./../models/activity');
// const config = require('./../configs/');

const getActivitys = async (userId = null) => {
    const activitys = await activityModel.find({ creator: userId }).sort({ createdAt: -1 });
    return activitys;
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
    console.log('On search activitys: ', activitys);
    
    return activitys;
};

const createActivity = async (docs = {}, sessionUser = null) => {

    const insertDocs = docs.form;
    insertDocs.creator = sessionUser._id;
    
    let newActivity = new activityModel(insertDocs);
    await newActivity.save();

    return newActivity;
};

const deleteActivity = async (activityId = null) => {
    const activity = await activityModel.findById(activityId);
    await activity.remove();
    return activity;
};

module.exports = {
    createActivity,
    getActivitys,
    searchActivitys,
    deleteActivity
}
