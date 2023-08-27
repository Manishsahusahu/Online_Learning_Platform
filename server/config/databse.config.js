const mongoose = require("mongoose");

exports.connect = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((con) =>
            console.log(
                `Connection successfully connected to ${con.connection.host}`
            )
        )
        .catch((error) => {
            console.log(error.message);
            process.exit(1);
        });
};
