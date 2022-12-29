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

        res.status(200).json({message: "Article added successfully" });
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    addArticleController,
}