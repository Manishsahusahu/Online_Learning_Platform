const {
    login,
    signup,
    sendOTP,
    changePassword,
} = require("../controllers/Auth.controller");
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword.controller");
const { auth } = require("../middlewares/auth.middleware");

const { Router } = require("express");
const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
