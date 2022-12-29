const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

// REGISTER
const authRegisterController = async (req, res) => {
    res.send('register controller')
};

// LOGIN
const authLoginController = async (req, res) => {
    res.send('login controller')
};

module.exports = {
    authRegisterController,
    authLoginController
}