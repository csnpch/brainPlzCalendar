const router = require('express').Router();
const { check } = require('express-validator');
const controller = require('../controllers/share');

router.get('/creator/:id', async (req, res) => {
    try {
        let shares = await controller.findShareByCreator(req.params.id, req.session.userLogin.joinShares);
        shares = await controller.findActivitysOnShares(req.session.userLogin._id, req.session.userLogin.joinShares, shares);
        res.status(200).json(shares);
    } catch(err) { res.error(err) }
});

router.get('/:id', async (req, res) => {
    try {
        const share = await controller.getShareById(req.params.id);
        res.status(200).json(share);
    } catch(err) { res.error(err) }
});

router.get('/find/invite/:code', async (req, res) => {
    try {
        const share = await controller.checkCodeJoin(req.params.code);
        res.status(200).json(share);
    } catch(err) { res.error(err) }
});


router.get('/find/public_key/:key', async (req, res) => {
    try {
        const share = await controller.findInviteByPublicKey(req.params.key, req.session.userLogin._id);
        res.status(200).json(share);
    } catch(err) { res.error(err) }
});


router.post('/join/:public_key/:creator', async (req, res) => {
    try {
        if (req.params.creator !== req.session.userLogin._id) {
            const join = await controller.joinSharing(req.session.userLogin._id, req.params.public_key);
            if (join) {
                res.status(200).json({ statusJoin: true });
            } else {
                res.status(200).json({ statusJoin: false, msg: 'You are already attending' });
            }
        } else {
            res.status(200).json({ statusJoin: false, msg: 'Cannot join your own attending' });
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