const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const { APP_SECRET, MSG_QUEUE_URL } = require("../configs");
const { CustomerModel } = require("../database/models");

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

module.exports.GeneratePassword = async (password, salt) => {
    try {
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
    return (await this.GeneratePassword(enteredPassword, salt) === savedPassword)
}

module.exports.ValidateSignature = async (req) => {
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

module.exports.ValidateAdmin = async (req) => {
    try {
        const { user } = req;
        if (user && user.role === "admin") {
            return true;
        }
        return false;
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

module.exports.Signature = require("./tokens");

module.exports.Message = require("./security");