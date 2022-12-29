const router = require('express').Router();
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');

router.use('/auth', authRoutes);
router.use('/article', articleRoutes);

module.exports = router;