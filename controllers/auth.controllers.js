const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');
const { assertValidPasswordService, assertEmailIsValid } = require('../services/auth.services');

// REGISTER
const authRegisterController = async (req, res) => {
    try {

        let userBody = req.body;
        let password = userBody.password;
        let email = userBody.email;

        try {
            assertValidPasswordService(password);
        } catch (error) {
            res.status(400).json({
                message: `Invalid password. Password must be at least 8 characters long, must have at least one lower case letter, must have at least one upper case letter must have at least one number  ${error.message}`,
            });
            return;
        }

        try {
            assertEmailIsValid(email);
        } catch (error) {
            res.status(400).json({ message: `Email is invalid: ${error.message}` });
            return;
        }

        const hash = encryptPassword(password);

        await models.user.create({
            email: userBody.email,
            name: userBody.name,
            surname: userBody.surname,
            password: hash,
            document: userBody.document,
            address: userBody.address,
        });
        res.send(`The user with email: ${email} has been created successfully`)
    } catch (error) {
        res.send(error);
    }
}

// LOGIN
const authLoginController = async (req, res) => {
    res.send('login controller')
};

module.exports = {
    authRegisterController,
    authLoginController
}