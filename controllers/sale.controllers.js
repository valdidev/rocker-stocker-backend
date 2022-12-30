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

const getSalesByUserIdController = async (req, res) => {

    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const articleBody = req.body;

    try {
        const { userId } = payload;

        const salesFounded = await models.sale.findAll({
            where: {
                userId
            }
        });

        if (!salesFounded) {
            res.status(404).json({ message: 'Sales not found' });
            return;
        }

        res.status(200).json({ message: 'Sales founded', data: salesFounded });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

const getAllSalesController = async (req, res) => {
    res.send('get all sales user')
};

const getSaleDetailsByIdController = async (req, res) => {
    try {
        const { saleId } = req.params;

        const salesFounded = await models.ArticleSales.findAll({
            where: {
                saleId
            }
        });

        if (!salesFounded) {
            res.status(404).json({ message: 'Sales not found' });
            return;
        }

        res.status(200).json({ message: 'Sales founded', data: salesFounded });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = {
    makeSaleController,
    getSalesByUserIdController,
    getAllSalesController,
    getSaleDetailsByIdController
};