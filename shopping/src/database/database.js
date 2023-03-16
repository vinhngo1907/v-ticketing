const { DB_URL } = require("../configs");
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("MongoDB connected!")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;