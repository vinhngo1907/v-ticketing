const CustomerService = require("../services/customer-service");
const { UserAuth, Admin } = require("./middleware");
const { SubscribeMessage } = require('../utils');
const { BASE_URL } = require("../configs");

module.exports = (app, channel = "") => {
    const service = new CustomerService();

    app.post(BASE_URL + "/login", async (req, res) => {
        const { email, password } = req.body;
        const data = await service.Login({ email, password });
        res.json(data)
    });

    app.post(BASE_URL + "/register", async (req, res) => {
        const { email, password, phone, fullname } = req.body;
        const { data } = await service.Register({ email, fullname, password, phone });
        res.json(data);
    });

    app.get(BASE_URL + "/profile", UserAuth, async (req, res) => {
        const { data } = await service.GetCustomer(req.user);
        res.json(data);
    });

    app.post(BASE_URL + "/logout", UserAuth, async (req, res) => {

    });

    app.post(BASE_URL + "/refresh-token", async (req, res) => {
        const { data } = await service.RefreshToken();
        res.json(data);
    })
}