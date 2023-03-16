const ProductService = require("../services/product-service");
const { UserAuth, Admin } = require("./middleware")

module.exports = (app, channel) => {
    app.get("/", async (req, res) => {

    });

    app.post("/", [UserAuth, Admin], async (req, res) => {

    });
}