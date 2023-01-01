const router = require('express').Router();
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');
const saleRoutes = require('./routes/sale.routes');
const userRoutes = require('./routes/user.routes');
const { authBearerMiddleware } = require('./middlewares/auth.middlewares');

router.use('/auth', authRoutes);
router.use('/user', authBearerMiddleware, userRoutes)
router.use('/article', authBearerMiddleware, articleRoutes);
router.use('/sale', authBearerMiddleware, saleRoutes);

module.exports = router;