const router = require('express').Router();

const {
    makeSaleController,
    getSalesByUserIdController,
    getAllSalesController,
    getSaleDetailsByIdController
} = require('../controllers/sale.controllers');
const { isAdminMiddleware, isAdminOrUserInvolvedMiddleware } = require('../middlewares/auth.middlewares');

router.post('/sell', makeSaleController);
router.get('/mysales', getSalesByUserIdController);
// only the admin or user involved
router.get('/details/:saleId', getSaleDetailsByIdController);
// only admin
router.get('/all', isAdminMiddleware, getAllSalesController);

module.exports = router;