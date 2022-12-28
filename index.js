const express = require('express');

const { sequelize } = require('./models');

const db = require('./db/db');


const app = express();

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
app.use(express.json());

app.get("/sayhi", (req, res) => {
    res.status(200).send({ msg: 'hi' });
});

app.post("/welcome", (req, res) => {
    const { username } = req.body;
    res.status(200).send({ msg: `welcome ${username}` });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);

    // sequelize.sync({force: true}).then(() => {
    sequelize.authenticate().then(() => {
        console.log('DB Connected')
    }).catch(error => {
        console.log('Something went wrong when connecting to the DB: ' + error)
    })
});