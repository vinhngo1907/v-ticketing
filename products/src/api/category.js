const { BASE_URL } = require("../configs");
const CategorytService = require("../services/category-service");
const { UserAuth, Admin } = require("./middleware")

module.exports = (app, channel) => {
    const service = new CategorytService();
    app.get(BASE_URL + "/category", async (req, res) => {
        const { data } = await service.GetAllCategories();
        res.json(data);
    });

    app.post(BASE_URL + "/category", [UserAuth, Admin], async (req, res) => {
        const { data } = await service.CreateCategory(req.body);
        res.json(data);
    });

    app.patch(BASE_URL + "/category/:id", [UserAuth, Admin], async (req, res) => {
        console.log(req.body)
        const { data } = await service.UpdateCategory(req.params.id, req.body);
        res.json(data);
    });

    app.delete(BASE_URL + "/category/:id", [UserAuth, Admin], async (req, res) => {
        const { data } = await service.DeleteCategory({id: req.params.id});
        res.json(data);
    })
}