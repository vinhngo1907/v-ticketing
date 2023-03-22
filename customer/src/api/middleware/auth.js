const { Signature } = require("../../utils");
const signature = new Signature();

module.exports = async (req, res, next) => {
    const isAuthorized = await signature.ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
}