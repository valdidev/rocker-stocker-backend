const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

const makeSaleController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const saleBody = req.body;
    const todaysDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`

    try {

        const saleMade = await models.sale.create({
            date: todaysDate,
            total: saleBody[0].total,
            userId: payload.userId
        });

        const cart = saleBody[1].cart;

        cart.map(async function (item) {

            item.saleId = saleMade.id

            if (item.quantity) {
                const article = await models.article.findByPk(item.articleId)
                await article.decrement('units', { by: item.quantity })
            } else {
                const article = await models.article.findByPk(item.articleId)
                await article.decrement('units')
            }
        });

        await models.ArticleSales.bulkCreate(cart);

        res.status(200).json({ message: "Sale maked successfully" });

    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    makeSaleController,
}