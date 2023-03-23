const { ProductRepository } = require("../database/");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    async CreateProduct() {

    }
}

module.exports = ProductService;