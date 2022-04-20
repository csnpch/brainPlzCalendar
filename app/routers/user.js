const router = require('express').Router();
const { check } = require('express-validator');
const controller = require('./../controllers/user');
const auth = require('../middleware/auth');


router.get('/self', auth, async (req, res) => {
    try {
        let tmpToken = req.session.userLogin.token;

        const user = await controller.getUserById(req.session.userLogin._id);
        req.session.userLogin = user;
        req.session.userLogin.token = tmpToken;
        
        res.status(200).json(user);
    } catch { res.status(500).json({ msg: 'Something went wrong' }); }
});


router.get('/getNameUser/:id', auth, async (req, res) => {
    res.status(200).json(await controller.getNameUserById(req.params.id));
});


router.post('/register', [
    check('name').not().isEmpty(),
    check('surname').not().isEmpty(),
    check('username').not().isEmpty(),
    check('password').not().isEmpty(),
    check('email').isEmail().not().isEmpty()
],async (req, res) => {
    try {
        req.validate();

        const { body } = req;
        const user = await controller.createUser(body); // Create and check user exist in our db
        
        res.status(201).send(user);
    } catch(err) { res.error(err); }
});


router.post('/login', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();

        const { body } = req;
        const user = await controller.checkUserLogin(body);
        req.session.userLogin = user;

        res.status(200).json(user);
    } catch(err) {
        res.error(err, (err.message.indexOf(':') !== -1 && parseInt(err.message.split(':')) ));
    }
});


router.post('/logout', async(req, res) => {
    try {
        req.session.userLogin = undefined;
        delete req.session.userLogin;
        res.status(200).json({ msg: 'Logout success' });
    } catch(err) { res.error(err); }
});


router.get('/getSession', async(req, res) => {
    try {
        res.status(200).json(req.session.userLogin);
    } catch(err) { res.error(err); }
});


router.post('/joinEvent/:id', async(req, res) => {
    try {
        const result = await controller.joinEvent(req.session.userLogin._id, req.params.id);
        res.status(200).json(result);
    } catch(err) { res.error(err); }
});


router.post('/unJoinEvent/:id', async (req, res) => {
    try {
        const result = await controller.unJoinEvnet(req.session.userLogin._id, req.params.id);
        res.status(200).json(result);
    } catch(err) { res.error(err) }
});


module.exports = router;