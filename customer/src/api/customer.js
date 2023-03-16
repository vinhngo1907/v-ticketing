const CustomerService = require("../services/customer-service");
const UserAuth = require("./middleware/auth");
const { SubscribeMessage } = require('../utils');

module.exports = (app, channel) => {
    const service = new CustomerService();

    app.post("/login", async (req, res) => {
        const { email, password, phone } = req.body;
        const { data } = await service.Login({ email, password, phone });
        res.json(data)
    });

    app.post("/register", async (req, res) => {
        const { email, password, phone } = req.body;
        const { data } = await service.Register({ email, password, phone });
        res.json(data);
    })
}