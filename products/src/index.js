const express = require('express');
const key = require('../src/configs/main.config');
const connectDB = require('../src/configs/db.config');
const expressApp = require('./');

const StartServer = async() => {
    const {port} = key
    const app = express();
    
    await connectDB();
    
    await expressApp(app);

    app.listen(port, () => {
        console.log(`listening to port ${port}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();