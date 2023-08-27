const {
    capturePayment,
    verifySignature,
} = require("../controllers/Payment.controller");

const router = require("express").Router();

router.post("/capturePayment", capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
