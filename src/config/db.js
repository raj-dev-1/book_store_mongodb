const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = () => {
    mongoose.connect(process.env.BASE_URL, 
    //     {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
)
    .then(() => console.log("Database connected sucessfully"))
    .catch((err) => {
        console.error("Database failed to connect",err.message); 
    });
}

module.exports = connectDB;