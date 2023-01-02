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

        res.status(200).json({ message: "Sale maked successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
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

        if (salesFounded.length === 0) {
            res.status(404).json({ message: 'Sales not found', success: false });
            return;
        }

        res.status(200).json({ message: 'Sales founded', data: salesFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const getAllSalesController = async (req, res) => {
    try {
        const salesFounded = await models.sale.findAll();

        if (salesFounded.length === 0) {
            res.status(404).json({ message: 'Sales not found', success: false });
            return;
        }

        res.status(200).json({ message: 'Sales founded', data: salesFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

const getSaleDetailsByIdController = async (req, res) => {
    const { authorization } = req.headers;
    const [strategy, jwt] = authorization.split(" ");
    const payload = jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
    const articleBody = req.body;
    try {
        const { saleId } = req.params;

        

        const saleFounded = await models.ArticleSales.findAll({
            where: {
                saleId
            }
        });

        if (saleFounded.length === 0) {
            res.status(404).json({ message: 'Sale not found', success: false });
            return;
        }

        res.status(200).json({ message: `Sale id ${saleId} founded`, data: saleFounded, success: true });

    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

module.exports = {
    makeSaleController,
    getSalesByUserIdController,
    getAllSalesController,
    getSaleDetailsByIdController
};