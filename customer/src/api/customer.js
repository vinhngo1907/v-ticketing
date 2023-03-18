const CustomerService = require("../services/customer-service");
const { UserAuth, Admin } = require("./middleware");
const { SubscribeMessage } = require('../utils');
const { BASE_URL } = require("../configs");

module.exports = (app, channel = "") => {
    const service = new CustomerService();

    app.post(BASE_URL + "/customer/login", async (req, res) => {
        const { email, password } = req.body;
        const data = await service.Login({ email, password });
        res.json(data)
    });

    app.post(BASE_URL + "/customer/register", async (req, res) => {
        const { email, password, phone, fullname } = req.body;
        const { data } = await service.Register({ email, fullname, password, phone });
        res.json(data);
    })
}