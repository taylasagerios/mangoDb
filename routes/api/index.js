const router = require('express').Router();
const thought = require('./thoughtRoute');
const  user = require('./userRoute');

router.use('/thought', thought);
router.use('/user', user);


module.exports = router;