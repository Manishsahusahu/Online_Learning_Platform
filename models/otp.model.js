const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 5 * 60 * 1000,
        },
    },
    { timestamps: true }
);

const sendVerificationEmail = async (email, otp) => {
    try {
        const response = await mailSender(
            email,
            "Verification Email from Online Education",
            otp
        );
        console.log("Mail has been sent successfully", response);
    } catch (error) {
        console.log("Error occured while sending mail ", error);
    }
};

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", otpSchema);
