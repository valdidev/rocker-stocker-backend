const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

const makeSaleController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET); 
    const saleBody = req.body;
    const todaysDate = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    try {
       let entireSale = await models.sale.create({
            date: todaysDate,
            total: saleBody.total,
            userId: payload.userId
        });

        await models.ArticleSales.create({
            articleId: saleBody.articleId,
            saleId: entireSale.id
        })

        res.status(200).json({message: "Sale maked successfully" });

        // res.status(200).json({message: "Article added successfully" });
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    makeSaleController,
}