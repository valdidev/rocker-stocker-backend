const {
    toggleAdminRoleController,
    getAllUsersController,
    modifyUserProfileController,
    toggleUserActiveController,
    deleteUserController } = require('../controllers/user.controller');

const router = require('express').Router();

router.patch('/toggle', toggleAdminRoleController);
router.get('/all', getAllUsersController);
router.patch('/modify', modifyUserProfileController);
router.patch('/active/:userId', toggleUserActiveController);
router.delete('/delete', deleteUserController);

module.exports = router;