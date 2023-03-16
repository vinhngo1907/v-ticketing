const CategoryRepository = require("../database/repository/category.repository");

class CategoryService{
    constructor(){
        this.categoryRepository = new CategoryRepository();
    }
}

module.exports = CategoryService;