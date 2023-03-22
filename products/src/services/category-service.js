const {CategoryRepository} =require("../database");
const { FormateData } = require("../utils");

class CategoryService{
    constructor(){
        this.categoryRepository = new CategoryRepository();
    }
    async CreateCategory(categoryInputs){
        const {name} = categoryInputs;
        if(name){
            const category = await this.categoryRepository.CreateCategory({name});
            return FormateData(category);
        }
    }
    async UpdateCategory(){
        
    }
    async DeleteCategory(){
        
    }
    async GetAllCategories(){
        
    }
}

module.exports = CategoryService;