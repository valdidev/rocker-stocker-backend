const express = require('express');
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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);

    /* sequelize.authenticate().then(() => {
        console.log('DB Connected')
    }).catch(error => {
        console.log('Something went wrong when connecting to the DB: ' + error)
    }) */
});