const {
    toggleAdminRoleController,
    getAllUsersController,
    modifyUserProfileController,
    toggleUserActiveController,
    deleteUserController, 
    getUserProfileByIdController} = require('../controllers/user.controller');
const { isAdminMiddleware } = require('../middlewares/auth.middlewares');

const router = require('express').Router();

//only the admin or the user involved
router.get('/profile/:userId', getUserProfileByIdController);
router.patch('/modify', modifyUserProfileController);
// only admin
router.patch('/toggle', isAdminMiddleware, toggleAdminRoleController);
router.get('/all', isAdminMiddleware, getAllUsersController);
router.patch('/active/:userId', isAdminMiddleware, toggleUserActiveController);
router.delete('/delete/:userId', isAdminMiddleware, deleteUserController);

module.exports = router;