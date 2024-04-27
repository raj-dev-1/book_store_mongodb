const User = require("../models/user.model");
const fs = require("fs");
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
       if(user){
         return true
       }
       return false;
    } catch (error) {
        console.log("error - ", error.message)
        throw new Error(error.message)
    }
};

const deletefile = async (file) => {
    try {
      await fs.unlinkSync(file.path);
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports = { getUserByEmail , deletefile }
