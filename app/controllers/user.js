const userModel = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../configs/');


const generatePassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
};


const comparePassword = async (pass_login, pass_user) => {
    return await bcrypt.compare(pass_login, pass_user);
};


const createToken = async (user) => {

    const token = jwt.sign(
        { 
            user_id: user._id, 
            email: user.email,
            username: user.username
        },
        config.authentication.token_key,
        {
            expiresIn: "2d"
        }
    );
    user.token = token; // save token

    return user;
};


const createUser = async (dosc = {}) => {
    const insertDocs = { ...dosc };

    insertDocs.username = dosc.username.toLowerCase();
    insertDocs.email = dosc.email.toLowerCase();

    // check user exist
    if (await userModel.findOne({'email': insertDocs.email})) { 
        throw new Error('User already exist. Please login');
    }

    insertDocs.password = await generatePassword(dosc.password);

    let newUser = new userModel(insertDocs);
    
    newUser = await createToken(newUser);

    await newUser.save();
};


const checkUserLogin = async (user) => {
    let dataUser = await userModel.findOne({'username': user.username.toLowerCase()})

    if (dataUser && await comparePassword(user.password, dataUser.password)) {
        dataUser = await createToken(dataUser);
        dataUser.password = undefined;
        delete dataUser.password;
        return dataUser;
    } else {
        throw new Error('401:Invalid Credentials');
    }
};


const getUsers = async () => {
    const users = await userModel.find();
    return users;
};


const getUserById = async (userId) => {
    const users = await userModel.findById(userId);
    return users;
};


const getNameUserById = async (userId) => {
    const user = await userModel.findById(userId);
    return user.name;
};


const updateUserById = async (userId, docs) => {
    const updatedUser = await userModel.updateOne({
        _id: userId
    }, docs, {
        // return ค่าที่ update แล้วออกไปข้างนอกจะได้นำไปใช้ต่อได้
        returnOriginal: false
    })
    return updatedUser;
};


const deleteUserById = async (userId) => {
    const deleteUser = await userModel.deleteOne({
        _id: userId
    });

    return deleteUser;
};

const updateJoinSharing = async (userId = null, public_key = null) => {
    // const user = await getUserById(userId);
    const updateData = await userModel.updateOne({
        _id: userId
    }, {
        $push: {
            joinShares: public_key
        }
    });
    return updateData;
}

const unregisterSharing = async (userId = null, public_key = null) => {
    const updateData = await userModel.updateOne({
        _id: userId
    }, {
        $pull: {
            joinShares: public_key
        }
    });

    return updateData;
}


const checkJoinSharingUser = async (userId = null, public_key = null) => {
    const dataUser = await getUserById(userId);

    if (dataUser) {
        for (let val of dataUser.joinShares) {
            if (val === public_key) { return false; }
        }
        return true;
    }
    return false;
}

module.exports = {
    createUser,
    checkUserLogin,
    getUsers,
    getUserById,
    getNameUserById,
    checkJoinSharingUser,
    updateUserById,
    deleteUserById,
    updateJoinSharing,
    unregisterSharing
}
