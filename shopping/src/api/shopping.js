const ShoppingService = require("../services/shopping-service");
const UserAuth = require("./middeware");
const { SubscribeMessage } = require('../utils');

module.exports = (app, channel) => {
    const service = new ShoppingService();

    app.post("/login", async (req, res) => {
        const { email, password, phone } = req.body;
        const { data } = await service.Login({ email, password, phone });
        res.json(data)
    })
}