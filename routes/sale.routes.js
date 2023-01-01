const router = require('express').Router();

const {
    makeSaleController,
    getSalesByUserIdController,
    getAllSalesController,
    getSaleDetailsByIdController
} = require('../controllers/sale.controllers');
const { isAdminMiddleware } = require('../middlewares/auth.middlewares');

router.post('/sell', makeSaleController);
//only the admin or the user involved
router.get('/mysales', getSalesByUserIdController);
router.get('/details/:saleId', getSaleDetailsByIdController);
// only admin
router.get('/all', isAdminMiddleware, getAllSalesController);

module.exports = router;