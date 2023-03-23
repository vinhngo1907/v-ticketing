'use strict'
const ApiFeatures = require("../../api/libs");
const { productModel } = require("../models");

class ProductRepository {
    constructor(){
        this.apiFeatures = new ApiFeatures();
    }
    async CreateProduct({ name }) {
        const category = await new productModel({ name });
        await category.save();
        return category;
    }

    async UpdateProduct({ id, name }) {
        const updatedProduct = await productModel.findOneAndUpdate({ _id: id }, { name }, { runValidators: true, new: true });
        return updatedProduct;
    }

    async DeleteCateogry({ id }) {
        const deletedProduct = await productModel.findOneAndDelete({ _id: id });
        return deletedProduct;
    }
}

module.exports = ProductRepository;