const {
    capturePayment,
    verifySignature,
} = require("../controllers/Payment.controller");

const { Router } = require("express");
const router = Router();

router.post("/capturePayment", capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
