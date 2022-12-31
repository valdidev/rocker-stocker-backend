const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');
const {
    assertValidPassword,
    assertEmailIsValid,
    encryptPassword
} = require('../services/auth.services');

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
            res.status(400).json({ message: `Invalid format password: ${error.message}` });
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
        res.status(200).json({message: "User created successfully" });
    } catch (error) {
        res.send(error);
    }
}

// LOGIN
const authLoginController = async (req, res) => {
    let userBody = req.body;
    let password = userBody.password;
    let email = userBody.email;

    const userFound = await models.user.findOne({
        where: { email: email, }
    });

    if (!userFound) {
        res.status(400).json({ message: 'Wrong email or password' });
        return;
    }

    const hashedPassword = encryptPassword(password);
    if (hashedPassword !== userFound.password) {
        res.status(400).json({ message: 'Wrong email or password' });
        return;
    }

    const secret = process.env.JWT_SECRET || '';

    if (secret.length < 10) {
        throw new Error("JWT_SECRET is not set");
    }

    const jwt = jsonwebtoken.sign({
        userId: userFound.id,
        email: userFound.email,
        rolId: userFound.rolId
    }, secret);

    res.status(200).json({
        message: "Successfully logged in",
        jwt: jwt,
    });
};

module.exports = {
    authRegisterController,
    authLoginController
}