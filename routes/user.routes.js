const router = require('express').Router();

router.post('/toggleAdmin', (req, res) => {
    res.send('toggle admin');
});

module.exports = router;