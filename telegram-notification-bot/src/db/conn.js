const mongoose = require("mongoose");

const mongoDbURL = process.env.MONGODB_URL
// mongodb://localhost:27017/thane
mongoose.connect(mongoDbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database Connection Successful");
}).catch((err) => {
    console.log("Database Connection Failed!", err);
});