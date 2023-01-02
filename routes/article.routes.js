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
// only admin
router.post('/add', isAdminMiddleware, addArticleController);
router.put('/modify/:id', isAdminMiddleware, modifyArticleByIdController);
router.patch('/visibility/:id', isAdminMiddleware, chArticleVisibilityByIdController);
router.delete('/delete/:id', isAdminMiddleware, deleteArticleByIdController);


// deluxe
// router.get('/all', (req, res) => {res.send('ver todos los artículos')});
// router.get('/name', (req, res) => {res.send('busqueda por nombre')});
// router.get('/category/all', (req, res) => {res.send('ver artículos de una categoría')});
// router.get('/brand/all', (req, res) => {res.send('ver artículos de una marca')});

module.exports = router;
