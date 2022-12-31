const {
    toggleAdminRoleController,
    getAllUsersController,
    modifyUserProfileController } = require('../controllers/user.controller');

const router = require('express').Router();

router.patch('/toggle', toggleAdminRoleController);
router.get('/all', getAllUsersController);
router.patch('/modify', modifyUserProfileController);
// router.patch('/active', )

module.exports = router;