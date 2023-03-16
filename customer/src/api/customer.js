const CustomerService = require("../services/customer-service");
// const UserAuth = require("./middleware");
const { SubscribeMessage } = require('../utils');

module.exports = (app, channel) => {
    const service = new CustomerService();

    app.post("/login", async (req, res) => {
        const { email, password, phone } = req.body;
        const { data } = await service.Login({ email, password, phone });
        res.json(data)
    })
}