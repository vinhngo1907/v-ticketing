const { APP_SECRET, APP_ACTIVE_SECRET, APP_RF_SECRET } = require("../../configs");
const jwt = require("jsonwebtoken");

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
}

module.exports = Signature;