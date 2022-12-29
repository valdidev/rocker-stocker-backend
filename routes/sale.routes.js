const { makeSaleController } = require('../controllers/sale.controllers');

const router = require('express').Router();

router.post('/sell', makeSaleController);

module.exports = router;