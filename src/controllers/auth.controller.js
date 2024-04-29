const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../services/user.service.js");
const secretKey = "djvndjd3243j3n543jwjsdfksdsn";

const deletefile = async (file) => {
  try {
    await fs.unlinkSync(file.path);
  } catch (error) {
    console.log(error);
  }
};

const uploadImg = async (req, res) => {
    try {
      return new Promise((resolve, reject) => {
        User.uploadImgPath(req, res, async (err) => {
          if (err) {
            console.log(err);
            return reject("Image upload unsuccessful");
          }
          resolve(req.file);
        });
      });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred. please try again later." });
    }
  };
  
const register = async (req,res) => {
    try {
        const file = await uploadImg(req, res);
        if (!req.body)
            return res.status(400).json({ message: "Please enter details" });

        const { name, email, password, confirmpassword, gender, interest } = req.body;
        if (confirmpassword !== password) {
            await deletefile(file);
            return res
                .status(400)
                .json({ message: "both password are not matching" });
        }

        const findUser = await getUserByEmail(email);

        if (findUser) {
            await deletefile(file);
            return res.status(400).json({
                message: "user already exists",
            });
        }

        let img = "";
        if (req.file) {
            img = User.imgPath + "/" + req.file.filename;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            gender,
            interest,
            img,
            password: hashedPassword,
        };

        const createUser = await User.create(newUser);

        if (!createUser)
          return res.status(400).json({ message: "user unable to create " });

        return res.status(201).json({ message: "user created successfully" });
    } catch (error) {
        if(req.file) await deletefile(req.file);
        
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ errors });
        }
        return res.status(500).json({ message: error });
    }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body; 
    const user = await User.findOne({ email }); 
    if (!user) return res.status(404).json({ message: "User not found" }); 
    
    const isValidPassword = await bcrypt.compare(password, user.password); 
    if (!isValidPassword) return res.status(400).json({ message: "Incorrect password" }); 

    const token = jwt.sign({ data: user }, secretKey, { expiresIn: "4h" }); 
    res.cookie("token", token, { httpOnly: true }); 

    return res.status(200).json({ message: "Login successful", token}); 
  } catch (error) { 
    return res.status(500).json({ message: "Internal server error" }); 
  }
};

const profile = (req,res) => {
    try {
      const {name,email,gender,interest,img} = req.user.data;
      const userDetails = {name,email,gender,interest,img};
      return res.status(200).json({
        message: "User details fetched successfully",
        userDetails,
      });
    } catch (error) {
      return res.status(404).json({ message: "profle not found" });
    }
}

module.exports = { register, profile, login };