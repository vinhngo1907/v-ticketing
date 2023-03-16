const CustomerService = require("../services/customer-service");
const UserAuth = require("./middleware/auth");
const { SubscribeMessage } = require('../utils');
const { BASE_URL } = require("../configs");

module.exports = (app, channel = "") => {
    const service = new CustomerService();

    app.post(BASE_URL+"/customer/login", async (req, res) => {
        const { email, password, phone } = req.body;
        const { data } = await service.Login({ email, password, phone });
        res.json(data)
    });

    app.post(BASE_URL+"/customer/register", async (req, res) => {
        const { email, password, phone, fullname } = req.body;
        const { data } = await service.Register({ email,fullname, password, phone });
        res.json(data);
    })
}