const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRATE_KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;