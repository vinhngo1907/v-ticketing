const ProductRepository = require("../database/repository/product-repository");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }
}

module.exports = ProductService;