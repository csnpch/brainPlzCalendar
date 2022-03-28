const router = require('express').Router();
const auth = require('../middleware/auth');

router.use('/user', require('./user'));
router.use('/activity', auth, require('./activity'));
router.use('/share', auth, require('./share'));

// router.post('/welcome', auth, (req, res) => {
//     res.status(200).send('Welcome user 🖐');
// });


module.exports = router;