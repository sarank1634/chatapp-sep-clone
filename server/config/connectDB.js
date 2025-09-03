const mongoose = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongoose connected");
            
        })

        connection.on('error', (err) => {
            console.log("Mongoose connection error", err);
            
        })
        
    } catch (error) {
        console.log("Mongoose connection error", error);
        
    }
}

module.exports = connectDB;
