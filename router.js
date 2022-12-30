const router = require('express').Router();
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');
const saleRoutes = require('./routes/sale.routes');
const userRoutes = require('./routes/user.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes)
router.use('/article', articleRoutes);
router.use('/sale', saleRoutes);

module.exports = router;