const express = require('express');
const app = express();
const { sequelize } = require('./models');
const db = require('./db/db');
const router = require('./router');
const bp = require('body-parser');


// const cors = require('cors');

//config cors options to AWS
/* var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}; */

let PORT = process.env.YOUR_PORT || process.env.PORT || 3000;

// app.use(cors(corsOptions));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}))
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