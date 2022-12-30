const { toggleAdminRoleController } = require('../controllers/user.controller');

const router = require('express').Router();

router.patch('/toggle', toggleAdminRoleController);

module.exports = router;