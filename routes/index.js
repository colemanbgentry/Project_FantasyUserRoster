const router = require('express').Router();

router.get('/', (req,res) => {res.send('Hello World');});

router.use('/users', require('./users'));
router.use('/characters', require('./characters'));

module.exports = router;