const mongoose = require("mongoose");

const connectDB = async (mongoUrl) => {
    try {
        await mongoose.connect(mongoUrl, {
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