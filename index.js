const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { checkForAuthenticationCookie } = require("./middewares/authentication");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const app = express();
const PORT = 3000;

// mongoose.connect().then((e) => {
//     console.log("DataBase connected");
// });

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user,
    });
}); 

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/blog", blogRoute);


app.listen(PORT, () => console.log("Server is running"));