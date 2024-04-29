const express = require('express');
const cors = require('cors'); 
require("dotenv").config();
const app = express();
const authRouter = require('./routes/auth.routes.js');
const bookRouter = require('./routes/book.routes.js');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
const port = 5000;
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/",(req, res) => {
  return res.status(200).send({message:"welcome to my DEMO api"})
})

app.use('/auth', authRouter); 
app.use('/book', bookRouter);

app.listen(port, async () => {
    try {
        await connectDB();
        console.log("server established successfully on port " + port);
    } catch (error) {
        console.log(error);
    }
});

module.exports = {app};