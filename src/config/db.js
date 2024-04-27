const mongoose = require('mongoose');
const connectDB = (url) => {
    mongoose.connect(url, 
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