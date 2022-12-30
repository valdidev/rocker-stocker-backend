const {
    makeSaleController,
    getSalesByUserIdController,
    getAllSalesController,
    getSaleDetailsByIdController
} = require('../controllers/sale.controllers');

const router = require('express').Router();

router.post('/sell', makeSaleController);
router.get('/mysales', getSalesByUserIdController);
router.get('/details/:saleId', getSaleDetailsByIdController);
router.get('/all', getAllSalesController);

module.exports = router;