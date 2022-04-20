const shareModel = require('./../models/share');
const { getNameUserById, checkJoinSharingUser, updateJoinSharing, unregisterSharing } = require('./../controllers/user');
const { getActivitysByPublicKey } = require('./../controllers/activity');
// const config = require('./../configs/');

const randomTextInvite = async (textLength) => {
    const chars = '0123456789'+'abcdefghij'
        +'0123456789'+'klmnopqrst'+'0123456789'
        +'uvwxyzABCD'+'0123456789'+'EFGHIJKLMN'
        +'0123456789'+'OPQRSTUVWX'+'YZ0123456789';
    let code = '';
    for (let i = 0; i < textLength; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
};


const findShareByCreator = async (creator_id = null, dataJoined = null) => {
    let find = await shareModel.findOne({creator: creator_id});
    if (!find) { find = { sharings: [] } }
    for (let val of dataJoined) {
        find.sharings.push(await findInviteByPublicKey(val, creator_id));
    }
    return find;
}


const findInviteByCode = async (code = null) => {
    const find = await shareModel.findOne({
        'sharings.code': code
    });
    return find;
};


const findInviteByPublicKey = async (key = null, creator_id = null) => {
    const find = await shareModel.findOne({
        'sharings.public_key': key
    });

    if (find) {
        let tmpCreator = null;
        if (creator_id === find.creator) {
            tmpCreator = creator_id;
        } else {
            tmpCreator = find.creator;
        }

        for (let val of find.sharings) {
            if (val.public_key === key) {
                return {
                    public_key: val.public_key,
                    code: val.code,
                    name: val.name,
                    detail: val.detail,
                    // protected_activitys: val.protected_activitys,
                    activitys: val.activitys,
                    members: val.members,
                    creator: {
                        id: tmpCreator,
                        name: await getNameUserById(tmpCreator)
                    }
                };
            }
        }
    }
    return null;
};


const createShare = async (userId = null, name = null, detail = null) => {

    const pushInvite = async (share_id, name, detail) => {

        const codeInvite = await randomTextInvite(6);
        const publicKey = await randomTextInvite(24);

        findCode = await findInviteByCode(codeInvite);
        findPublicKey = await findInviteByPublicKey(publicKey);
        
        while (findCode) {
            codeInvite = await randomTextInvite(6);
            findCode = await findInviteByCode(codeInvite);
        }

        while (findPublicKey) {
            publicKey = await randomTextInvite(24);
            findPublicKey = await findInviteByCode(publicKey);
        }

        await shareModel.findOneAndUpdate({ _id: share_id }, {
            $push: {
                sharings: {
                    public_key: publicKey, 
                    code: codeInvite,
                    name: name,
                    detail: detail,
                    // protected_activitys: [],
                    activitys: [],
                    members: []
                }
            }
        });
        
        return {
            code: codeInvite,
            name: name,
            detail: detail
        };
    }

    const share = await shareModel.findOne({creator: userId});

    if (!share) {
        const newShare = new shareModel({
            creator: userId,
        });
        await newShare.save();
        return pushInvite(newShare._id, name, detail);
    } else {
        return pushInvite(share._id, name, detail);
    }

};


const updateSharings = async (creator = null, newDataShares = null) => {
    const update = await shareModel.findOneAndUpdate({creator: creator}, {
        $set: {
            sharings: newDataShares
        }
    });
    return update;
}


const deleteShare = async(userId= null, public_key = null) => {
    const findShare = await shareModel.find({creator: userId});
    let tmpShares = [];
    for (share of findShare[0].sharings) {
        if (share.public_key !== public_key) {
            tmpShares.push(share);
        } else {
            for (let member of share.members) {
                await unregisterSharing(member, public_key); //! add new
            }
        }
    }
    return await updateSharings(userId, tmpShares);
};


const checkCodeJoin = async (code = null) => {
    const join = await findInviteByCode(code);
    if (join) {
        const nameUser = await getNameUserById(join.creator);
        for (let item of join.sharings) {
            if (item.code === code) {
                return { 
                    invite: item, 
                    creator: {
                        id: join.creator, 
                        name: nameUser
                    } 
                };
            }
        }
    }
    return null;
}


const joinSharing = async (userId = null, public_key = null) => {

    const pushUserToAttending = async (userId, public_key) => {
        const find = await shareModel.findOne({'sharings.public_key': public_key});
        if (find) {
            for (let item of find.sharings) {
                if (item.public_key === public_key) {
                    await shareModel.findOneAndUpdate({'sharings.public_key': public_key}, {
                        $push: {
                            'sharings.$.members': userId
                        }
                    });
                }
            }
        }
    };
    
    const checkJoin = await checkJoinSharingUser(userId, public_key);
    if (checkJoin) {
        const join = await updateJoinSharing(userId, public_key);
        await pushUserToAttending(userId, public_key);
        return join;
    }
    
    return null;
}


const unjoinSharing = async (userId = null, public_key = null) => {
    const share = await shareModel.findOne({'sharings.public_key': public_key});
    if (share) {
        for (let item of share.sharings) {
            if (item.public_key === public_key) {
                await shareModel.findOneAndUpdate({'sharings.public_key': public_key}, {
                    $pull: {
                        'sharings.$.members': userId
                    }
                });
            }
        }
    }
    const unregisterOnUser = await unregisterSharing(userId, public_key);
    return unregisterOnUser;
};


const findActivitysOnShares = async (userId, dataJoin, dataShare) => {
    
    dataShare.sharings = dataShare.sharings.filter(item => item !== null);
    
    for (let public_key of dataJoin) {
        await getActivitysByPublicKey(public_key).then(res => {
            for (let item of res) {
                if (item.creator !== userId) {
                    for (let share of dataShare.sharings) {
                        share.activitys.push(item);
                    }
                }
            }
        });
    }
    
    // dataShare.sharing = activitys;
    // console.log('\n\nactivitys:::\n', dataShare, '\n\n');
    // dataShare
    return dataShare;
};

module.exports = {
    findInviteByPublicKey,
    findShareByCreator,
    findInviteByCode,
    checkCodeJoin,
    joinSharing,
    unjoinSharing,
    createShare,
    deleteShare,
    findActivitysOnShares
}
