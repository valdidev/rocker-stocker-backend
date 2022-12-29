const router = require('express').Router();
const {
    authRegisterController, 
    authLoginController,
} = require('../controllers/auth.controllers');


router.post('/register', authRegisterController);
router.post('/login', authLoginController);

module.exports = router;