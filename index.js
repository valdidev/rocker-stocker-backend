const express = require('express');
const app = express();
const { sequelize } = require('./models');
require('dotenv').config()

const router = require('./router');
const bp = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT;

app.use(cors())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);

    // sequelize.sync({force: true}).then(() => {
    sequelize.authenticate().then(() => {
        console.log('DB Connected')
    }).catch(error => {
        console.log('Something went wrong when connecting to the DB: ' + error)
    })
});