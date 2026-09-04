const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const verifyToken = require('../middleware/verifyToken');

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
// Protected — verifyToken runs first and attaches req.user before the controller
router.get('/me', verifyToken, usersCtrl.getMe);
router.put('/me', verifyToken, usersCtrl.updateMe);


module.exports = router;
