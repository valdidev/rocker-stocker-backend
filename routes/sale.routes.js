const {
    makeSaleController,
    getSalesByUserIdController,
    getAllSalesController
} = require('../controllers/sale.controllers');

const router = require('express').Router();

router.post('/sell', makeSaleController);
router.get('/mysales', getSalesByUserIdController);
router.get('/all', getAllSalesController);

module.exports = router;