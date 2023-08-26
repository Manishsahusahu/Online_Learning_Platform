const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay.config");
const Course = require("../models/course.model");
const User = require("../models/user.model");
const { default: AppError } = require("../utils/error.utils");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender.utils");

exports.capturePayment = async function (req, res, next) {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) return next(new AppError("Course Id not found", 400));

        const course = await Course.findById(courseId);
        if (!course) return next(new AppError("Course not found", 400));

        const user = await User.findById(userId);
        if (!user) return next(new AppError("User not found", 400));

        const uid = new mongoose.Types.ObjectId(userId); // from string to objectID
        if (course.students.includes(uid))
            return next(new AppError("Student already enrolled", 400));

        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId,
                userId,
            },
        };

        // create razorpay payment order
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        res.status(200).json({
            success: true,
            message: "Order is created successfully",
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};

exports.verifySignature = async function (req, res) {
    try {
        const webHookSecret = "123456";

        const signature = req.header["x-razorpay-signature"];

        const shasum = crypto
            .createHmac("sha256", webHookSecret)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (signature === shasum) {
            console.log("Payment is authorized");
            const { courseId, userId } = req.body.payload.payment.entity.notes;

            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        students: userId,
                    },
                },
                { new: true }
            );
            if (!enrolledCourse)
                return next(new AppError("enrolled course not found", 400));

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                    },
                },
                { new: true }
            );
            console.log("Enrolled student is here: ", enrolledStudent);

            const mailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulation! Enrolled in Course",
                "Congratulations! You have successfully enrolled in course"
            );
            console.log(mailResponse);
            res.status(200).json({
                success: true,
                message:
                    "Signature verified and student enrolled in course successfully",
            });
        }
        return next(new AppError("Verification of signature failed", 400));
    } catch (error) {
        return next(new AppError(error.message, 400));
    }
};
