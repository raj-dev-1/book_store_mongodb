const User = require("../models/user.model.js");
const fs = require("fs");
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user ? true : false;
    } catch (error) {
        console.log("error - ", error.message)
        throw new Error(error.message)
    }
};

  

module.exports = { getUserByEmail }
