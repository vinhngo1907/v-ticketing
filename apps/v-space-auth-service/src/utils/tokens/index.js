const { APP_SECRET, APP_ACTIVE_SECRET, APP_RF_SECRET } = require("../../application/configs");
const jwt = require("jsonwebtoken");
const { CustomerModel } = require("../../database/models");

class Signature {
    async GenerateRefreshSignature(payload){
        try {
            return await jwt.sign(payload, APP_RF_SECRET, { expiresIn: "7d" });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    
    async GenerateActiveSignature(payload){
        try {
            return await jwt.sign(payload, APP_ACTIVE_SECRET, { expiresIn: "5m" });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async GenerateSignature(payload){
        try {
            return await jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async ValidateSignature(req){
        try {
            const authHeader = req.header('Authorization');
            const token = authHeader && authHeader.split(" ")[1];
            const decoded = jwt.verify(token, APP_SECRET);
            const user = await CustomerModel
                .findOne({ _id: decoded._id, email: decoded.email })
                .select("-password -createdAt -updatedAt");
            if (!user) {
                return false;
            }
    
            req.user = decoded;
    
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    
    }   
}

module.exports = Signature;