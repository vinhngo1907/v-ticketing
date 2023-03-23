const { BASE_URL } = require("../configs");
const ProductService = require("../services/product-service");
const { UserAuth, Admin } = require("./middleware")

module.exports = (app, channel) => {
    const service = new ProductService();
    app.get(BASE_URL+"/product", async (req, res) => {
        
    });

    app.post(BASE_URL+"/product", [UserAuth, Admin], async (req, res) => {

    });
}