const jwt = require('jsonwebtoken');
const secretKey = "djvndjd3243j3n543jwjsdfksdsn";

const verifyToken = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    })
}

module.exports = verifyToken;