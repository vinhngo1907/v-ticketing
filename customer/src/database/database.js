const { DB_URL } = require("../configs")
const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("MongoDB connected!")
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error.message);
        process.exit(1);
    }
}