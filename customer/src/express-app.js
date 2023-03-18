const express = require('express');
const cors = require('cors');
const { customer, appEvents } = require('./api');
const { CreateChannel, SubscribeMessage } = require('./utils')
// const {Er} = require("../src/utils")
module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api
    appEvents(app);

    // const channel = await CreateChannel()


    customer(app, channel = "");
    // error handling
    // errorHandler(app);
}