const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');
const {
    assertValidPassword,
    assertEmailIsValid,
    encryptPassword,
    assertEmailIsUnique } = require('../services/auth.services');

// REGISTER
const authRegisterController = async (req, res) => {
    try {

        let userBody = req.body;

        let password = userBody.password;
        let email = userBody.email;

        // valid format password
        try {
            assertValidPassword(password);
        } catch (error) {
            res.status(400).json({ message: `Password is invalid: ${error.message}` });
            return;
        }

        // valid format email
        try {
            assertEmailIsValid(email);
        } catch (error) {
            res.status(400).json({ message: error.message });
            return;
        }

        const hash = encryptPassword(password);

        await models.user.create({
            email: userBody.email,
            password: hash,
            name: userBody.name,
            surname: userBody.surname,
            phone: userBody.phone
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