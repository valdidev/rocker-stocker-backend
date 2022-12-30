const { toggleAdminRoleController, getAllUsersController } = require('../controllers/user.controller');

const router = require('express').Router();

router.patch('/toggle', toggleAdminRoleController);
router.get('/all', getAllUsersController);

module.exports = router;