const router = require('express').Router();
const { check } = require('express-validator');
const controller = require('../controllers/activity');

router.get('/', async (req, res) => {
    try {
        const activitys = await controller.getActivitys(req.session.userLogin._id);
        // console.log('typeof is ', typeof activitys);
        res.status(200).json(activitys);
    } catch(err) { res.error(err) }
});

router.post('/create', [
    check('form').not().isEmpty().withMessage('Data is required'),
], async (req, res) => {
    try {
        req.validate();
    
        const activity = await controller.createActivity(req.body, req.session.userLogin);
        
        res.status(200).json(activity);
    } catch(err) { res.error(err); }
});

router.get('/findOne/:id', async (req, res) => {
    try {
        const activity = await controller.getActivityById(req.params.id);
        res.status(200).json(activity);
    } catch(err) { res.error(err); }
});

router.put('/update/:id', async (req, res) => {
    try {
        const result = await controller.updateActivity(req.params.id, req.body);
        res.status(200).json({data: result});
    } catch(err) { res.error(err); }
});

router.post('/delete', [
    check('activity_id').not().isEmpty().withMessage('Activity ID is required'),
], async (req, res) => {
    try {
        req.validate();
        
        const activity = await controller.deleteActivity(req.body.activity_id);
        res.status(200).json(activity);

    } catch(err) { res.error(err); }
});


router.get('/countMembers/:id', [
    check('id').not().isEmpty().withMessage('Activity ID is required')
], async (req, res) => {
    try {
        req.validate();
        
        const result = await controller.countMembers(req.params.id);
        res.status(200).json(result);

    } catch (err) { res.error(err) }
});

router.post('/search', [
    check('keyword').not().isEmpty().withMessage('Keyword is required'),
], async (req, res) => {
    try {
        req.validate();
        
        const activitys = await controller.searchActivitys(req.body.keyword, req.session.userLogin);
        res.status(200).json(activitys);

    } catch(err) { res.error(err); }
});

module.exports = router;