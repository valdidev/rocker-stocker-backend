const router = require('express').Router();
const {
    addArticleController,
    modifyArticleByIdController,
    chArticleVisibilityByIdController,
    deleteArticleByIdController, 
    getArticleById} = require('../controllers/article.controllers');


router.post('/add', addArticleController);
router.get('/see/:id', getArticleById);
router.put('/modify/:id', modifyArticleByIdController);
router.patch('/visibility/:id', chArticleVisibilityByIdController);
router.delete('/delete/:id', deleteArticleByIdController);


// deluxe
// router.get('/all', (req, res) => {res.send('ver todos los artículos')});
// router.get('/name', (req, res) => {res.send('busqueda por nombre')});
// router.get('/category/all', (req, res) => {res.send('ver artículos de una categoría')});
// router.get('/brand/all', (req, res) => {res.send('ver artículos de una marca')});

module.exports = router;
