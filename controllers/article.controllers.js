const { Op } = require('sequelize');
const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

// detail view
const getArticleByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const articleFounded = await models.article.findByPk(id);

        if (!articleFounded || !articleFounded.isVisible) {
            res.status(404).json({ message: 'Article not found', success: false });
            return;
        }

        res.status(200).json({ message: 'Article founded', data: articleFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

// for scan articles
const getArticleByEanController = async (req, res) => {
    try {
        const { ean } = req.params;

        const articleFounded = await models.article.findOne({ where: { ean } })

        if (!articleFounded || !articleFounded.isVisible) {
            res.status(404).json({ message: 'Article not found', success: false });
            return;
        }

        res.status(200).json({ message: 'Article founded', data: articleFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

// find by category
const getArticlesByCategoryController = async (req, res) => {
    try {
        const { category } = req.params;

        const articlesFounded = await models.article.findAll({
            where: {
                [Op.and]: [
                    {
                        category: {
                            [Op.like]: `${category}%`
                        }
                    },
                    {
                        isVisible: true
                    }
                ]
            }
        });

        if (!articlesFounded) {
            res.status(404).json({ message: 'Article not found', success: false });
            return;
        }

        res.status(200).json({ message: 'Article founded', data: articlesFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

/////////////////
// only admin
const addArticleController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const articleBody = req.body;

    try {
        await models.article.create({
            name: articleBody.name,
            brand: articleBody.brand,
            category: articleBody.category,
            price: articleBody.price,
            units: articleBody.units,
            ean: articleBody.ean,
            userId: payload.userId
        })

        res.status(200).json({ message: "Article added successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const modifyArticleByIdController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const articleBody = req.body;

    try {
        const { id } = req.params;

        const articleFounded = await models.article.findByPk(id);

        if (!articleFounded) {
            res.status(404).json({ message: 'Article not found', success: false });
            return;
        }

        await articleFounded.update({
            name: articleBody.name,
            brand: articleBody.brand,
            category: articleBody.category,
            price: articleBody.price,
            units: articleBody.units,
            ean: articleBody.ean,
            userId: payload.userId
        });

        res.status(200).json({ message: "Article modified successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const chArticleVisibilityByIdController = async (req, res) => {

    try {
        const { id } = req.params;

        const articleFounded = await models.article.findByPk(id);

        if (!articleFounded) {
            res.status(404).json({ message: 'Article not found', success: false });
            return;
        }

        await articleFounded.update({
            isVisible: !articleFounded.isVisible
        });

        let visibleStatus = (articleFounded.isVisible) ? "visible" : "hidden"

        res.status(200).json({ message: `Article ${articleFounded.name} modified to ${visibleStatus}`, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const getInvisibleArticlesController = async (req, res) => {
    try {
        const articlesFounded = await models.article.findAll({
            where: {
                isVisible: false
            }
        });

        if (articlesFounded.length === 0) {
            res.status(404).json({ message: 'No invisible articles', success: false });
            return;
        }

        res.status(200).json({ message: 'Articles founded', data: articlesFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const deleteArticleByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const articleFounded = await models.article.findByPk(id);

        if (!articleFounded) {
            res.status(404).json({ message: 'Article not found', success: false });
            return;
        }

        await articleFounded.destroy();

        res.status(200).json({ message: `Article ${articleFounded.name} deleted successfully`, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};
/////////////////

module.exports = {
    addArticleController,
    modifyArticleByIdController,
    chArticleVisibilityByIdController,
    deleteArticleByIdController,
    getArticleByIdController,
    getArticleByEanController,
    getArticlesByCategoryController,
    getInvisibleArticlesController
};