const { ProductModel } = require("../models");

class ProductRepository {
    async Products() {
        return await ProductModel.find();
    }

    async FindById(id) {
        return await ProductModel.findById(id);
    }

    async FindByCategory(category) {
        const prodcts = await ProductModel.find({ type: category });
        return prodcts;
    }

    async FindSelectedProducts(selectedIds) {
        const products = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return products;
    }
}

module.exports = ProductRepository;