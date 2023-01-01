const {
    toggleAdminRoleController,
    getAllUsersController,
    modifyUserProfileController,
    toggleUserActiveController,
    deleteUserController } = require('../controllers/user.controller');
const { isAdminMiddleware } = require('../middlewares/auth.middlewares');

const router = require('express').Router();

router.patch('/toggle', isAdminMiddleware, toggleAdminRoleController);
router.get('/all', isAdminMiddleware, getAllUsersController);
router.patch('/modify', modifyUserProfileController);
router.patch('/active/:userId', isAdminMiddleware, toggleUserActiveController);
router.delete('/delete', isAdminMiddleware, deleteUserController);

module.exports = router;