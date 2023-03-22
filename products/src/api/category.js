const { BASE_URL } = require("../configs");
const CategorytService = require("../services/category-service");
const { UserAuth, Admin } = require("./middleware")

module.exports = (app, channel) => {
    const service = new CategorytService();
    app.get(BASE_URL + "/category", async (req, res) => {
        const { data } = service.GetAllCategories();
        res.json(data);
    });

    app.post(BASE_URL + "/category", [UserAuth, Admin], async (req, res) => {
        const { data } = service.CreateCategory(req.body);
        res.json(data);
    });

    app.patch(BASE_URL + "/category/:id", [UserAuth, Admin], async (req, res) => {
        const { data } = service.UpdateCategory(req.body);
        res.json(data);
    });

    app.delete(BASE_URL + "/category/:id", [UserAuth, Admin], async (req, res) => {
        const { data } = service.DeleteCategory();
        res.json(data);
    })
}