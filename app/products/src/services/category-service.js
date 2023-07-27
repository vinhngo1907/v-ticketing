const { CategoryRepository } = require("../database");
const { FormateData } = require("../utils");

class CategoryService {
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }
    async GetAllCategories() {
        const categories = await this.categoryRepository.GetAllCategories();
        return FormateData({ msg: "Get categories successfully", categories });
    }
    async CreateCategory(categoryInputs) {
        const { name } = categoryInputs;
        if (name) {
            const category = await this.categoryRepository.CreateCategory({ name });
            return FormateData({ msg: "Created category successfully", category });
        }
    }
    async UpdateCategory(id, categoryInputs) {
        const { name } = categoryInputs;
        if (name) {
            const updatedCategory = await this.categoryRepository.UpdateCategory({id, name });
            return FormateData({ msg: "Updated category successfully", category: updatedCategory });
        }
    }
    async DeleteCategory({ id }) {
        console.log(id);
        const deletedCategory = await this.categoryRepository.DeleteCateogry({ id });
        return FormateData({ msg: "Deleted category successfully", category: deletedCategory });
    }
}

module.exports = CategoryService;