require("dotenv").config();
const express = require("express");
const app = express();

const courseRoute = require("./routes/Course.route");
const paymentRoute = require("./routes/Payment.route");
const profileRoute = require("./routes/Profile.route");
const userRoute = require("./routes/User.route");

const database = require("./config/databse.config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary.config");
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 4000;

database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: `http://localhost:3000`,
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

cloudinaryConnect();

//routes
app.use("/auth/v1/course", courseRoute);
app.use("/auth/v1/user", userRoute);
app.use("/auth/v1/profile", profileRoute);
app.use("/auth/v1/payment", paymentRoute);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
    });
});

app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
});
