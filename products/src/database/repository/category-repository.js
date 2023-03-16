const { categoryModel } = require("../models");

class CategoryRepository {
    async CreateCategory({ name }) {
        const category = await new categoryModel({ name });
        await category.save();
        return category;
    }

    async UpdateCategory({ id, name }) {
        const updatedCategory = await categoryModel.findOneAndUpdate({ _id: id }, { name }, { runValidators: true, new: true });
        return updatedCategory;
    }

    async DeleteCateogry({id}){
        const deletedCategory = await categoryModel.findOneAndDelete({_id: id});
        return deletedCategory;
    }
}

module.exports = CategoryRepository;