const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const { APP_SECRET, MSG_QUEUE_URL } = require("../configs");

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt)
}

module.exports.ValidPassword = async (enteredPassword, savedPassword, salt) => {
    return (await this.GeneratePassword(enteredPassword, salt) === savedPassword)
}

module.exports.GenerateSignature = async (payload) => {
    try {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.ValidSignature = async (req) => {
    try {
        const authHeader = req.headers['Authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        const decoded = jwt.verify(token, APP_SECRET);
        req.user = decoded;
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.FormateData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not found!");
    }
};