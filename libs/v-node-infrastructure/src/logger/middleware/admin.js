// const { ValidateAdmin } = require("../../utils");

module.exports = async (req, res, next) => {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Please login to continue!" });

        // const user = await userModel.findById(req.user._id);

        if (req.user.role !== "admin")
            return res.status(400).json({ message: "Admin resources access denied!" });

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: error.message });

    }
}