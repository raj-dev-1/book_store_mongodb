const express = require('express');
const router = express.Router();
const { login, profile, register } = require("../controllers/auth.controller.js");
const verifyToken = require('../config/verifyToken.js');

router.post('/login', login);

router.post('/register', register);
router.use(verifyToken);
router.get('/profile', profile);

module.exports = router;
