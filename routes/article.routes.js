const router = require('express').Router();
const { addArticleController } = require('../controllers/article.controllers');


router.post('/add', addArticleController);

module.exports = router;
