const { toggleAdminRoleController, getAllUsersController, modifyUserProfile } = require('../controllers/user.controller');

const router = require('express').Router();

router.patch('/toggle', toggleAdminRoleController);
router.get('/all', getAllUsersController);
router.patch('/modify', modifyUserProfile);

module.exports = router;