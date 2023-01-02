const router = require('express').Router();
const {
    addArticleController,
    modifyArticleByIdController,
    chArticleVisibilityByIdController,
    deleteArticleByIdController,
    getArticleByIdController,
    getArticleByEanController } = require('../controllers/article.controllers');
const { isAdminMiddleware } = require('../middlewares/auth.middlewares');


router.get('/id/:id', getArticleByIdController);
router.get('/ean/:ean', getArticleByEanController);
router.get('/category', (req, res) => {res.send('ver artículos de una categoría')});
// only admin
router.post('/add', isAdminMiddleware, addArticleController);
router.put('/modify/:id', isAdminMiddleware, modifyArticleByIdController);
router.patch('/visibility/:id', isAdminMiddleware, chArticleVisibilityByIdController);
router.delete('/delete/:id', isAdminMiddleware, deleteArticleByIdController);

module.exports = router;
