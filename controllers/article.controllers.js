const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

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

        res.status(200).json({ message: "Article added successfully" });
    } catch (error) {
        res.send(error);
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
            res.status(404).json({ message: 'Article not found' });
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

        res.status(200).json({ message: "Article modified successfully" });

    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    addArticleController,
    modifyArticleByIdController,
}