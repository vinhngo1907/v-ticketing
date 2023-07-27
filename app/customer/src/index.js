const express = require('express');
const { PORT } = require("./configs")
const { databaseConnection } = require('../src/database');
const expressApp = require('./express-app');

const StartServer = async () => {
    const app = express();

    await expressApp(app);

    databaseConnection();

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();