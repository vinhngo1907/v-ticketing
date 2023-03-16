const { ValidateAdmin } = require("../../utils");

module.exports = async (req, res, next) => {
    const isAadmin = await ValidateAdmin(req);

    if (isAadmin) {
        return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
}