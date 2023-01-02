const router = require('express').Router();
const {
    addArticleController,
    modifyArticleByIdController,
    chArticleVisibilityByIdController,
    deleteArticleByIdController,
    getArticleByIdController,
    getArticleByEanController,
    getArticlesByCategoryController, 
    getInvisibleArticlesController} = require('../controllers/article.controllers');
const { isAdminMiddleware } = require('../middlewares/auth.middlewares');


router.get('/id/:id', getArticleByIdController);
router.get('/ean/:ean', getArticleByEanController);
router.get('/category/:category', getArticlesByCategoryController);
// only admin
router.get('/invisibles', isAdminMiddleware, getInvisibleArticlesController);
router.post('/add', isAdminMiddleware, addArticleController);
router.put('/modify/:id', isAdminMiddleware, modifyArticleByIdController);
router.patch('/visibility/:id', isAdminMiddleware, chArticleVisibilityByIdController);
router.delete('/delete/:id', isAdminMiddleware, deleteArticleByIdController);

module.exports = router;
