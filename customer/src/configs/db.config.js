const mongoose = require("mongoose");

const connectDB = async(mongoUrl)=>{
    try{
        await mongoose.connect(mongoUrl,{

        })
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;