const router = require('express').Router();
const { check } = require('express-validator');
const controller = require('../controllers/share');

router.get('/creator/:id', async (req, res) => {
    try {
        const shares = await controller.findShareByCreator(req.params.id, req.session.userLogin.joinShares);
        res.status(200).json(shares);
    } catch(err) { res.error(err) }
});

router.get('/find/invite/:code', async (req, res) => {
    try {
        const share = await controller.checkCodeJoin(req.params.code);
        res.status(200).json(share);
    } catch(err) { res.error(err) }
});

router.post('/join/:public_key/:creator', async (req, res) => {
    try {
        if (req.params.creator !== req.session.userLogin._id) {
            const share = await controller.joinSharing(req.session.userLogin._id, req.params.public_key);
            res.status(200).json({ statusJoin: true });
        } else {
            res.status(200).json({ statusJoin: false, msg: 'You can not join your own share' });
        }
    } catch(err) { res.error(err) }
});

router.post('/create', [
    check('name').not().isEmpty().withMessage('Name is required'),
], async (req, res) => {
    try {
        req.validate();

        const { name, detail } = req.body;
        const share = await controller.createShare(req.session.userLogin._id, name, detail);

        res.status(200).json(share);
    } catch(err) { res.error(err) }
});

router.delete('/public_key=:value', async (req, res) => {
    try {
        const share = await controller.deleteShare(req.session.userLogin._id, req.params.value);  
        res.status(200).json(share);
    } catch(err) { res.error(err) }
});

router.post('/unregister', async (req, res) => {
    try {
        const share = await controller.unjoinSharing(req.session.userLogin._id, req.body.public_key);
        res.status(200).json({ statusJoin: true, share });
    } catch(err) { res.error(err) }
});

module.exports = router;