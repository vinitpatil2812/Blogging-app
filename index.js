const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// mongoose.connect().then((e) => {
//     console.log("DataBase connected");
// });

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("home");
}); 

app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);


app.listen(PORT, () => console.log("Server is running"));