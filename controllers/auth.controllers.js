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
            res.status(400).json({ message: error.message });
            return;
        }

        // valid format email
        try {
            assertEmailIsValid(email);
        } catch (error) {
            res.status(400).json({ message: error.message, success: false });
            return;
        }

        // assert email does not exist
        try {
            const emailFounded = await models.user.findOne({
                where: {
                    email
                }
            })

            if (emailFounded) {
                res.status(400).json({ message: "Email already exists", success: false });
                return;
            }

        } catch (error) {
            res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
        }

        const hash = encryptPassword(password);

        await models.user.create({
            email: userBody.email,
            password: hash,
            name: userBody.name,
            surname: userBody.surname,
            phone: userBody.phone
        });

        res.status(200).json({ message: "User created successfully", success: true });
    } catch (error) {
        res.send(error);
    }
}

// LOGIN
const authLoginController = async (req, res) => {
    try {
        let userBody = req.body;
        let password = userBody.password;
        let email = userBody.email;

        if (email.length === 0 || password.length === 0) {
            res.status(400).json({ message: 'Fill in the text files', success: false });
            return;
        }

        const userFound = await models.user.findOne({
            where: { email: email, }
        });

        if (!userFound) {
            res.status(400).json({ message: 'Wrong email or password', success: false });
            return;
        }

        const hashedPassword = encryptPassword(password);
        if (hashedPassword !== userFound.password) {
            res.status(400).json({ message: 'Wrong email or password', success: false });
            return;
        }

        let secret = process.env.JWT_SECRET || '';

        if (secret.length < 10) {
            throw new Error('Secret missing or too weak');
        }

        const jwt = jsonwebtoken.sign({
            userId: userFound.id,
            email: userFound.email,
            rolId: userFound.rolId
        }, secret);

        res.status(200).json({
            message: "Successfully logged in",
            user: {
                name: userFound.name,
                email: userFound.email,
                rolId: userFound.rolId,
                jwt: jwt
            },
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: `Something went wrong: ${error}`, success: false });
    }
};

module.exports = {
    authRegisterController,
    authLoginController
}