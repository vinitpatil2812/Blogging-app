const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("signin", async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateTOken(email, password);

        return res.cookie("token", token).redirect("/");
    }
    catch (error) {
        return res.render("signin", {
            error,
        });
    }
});

router.post("signup", async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
}); 


module.exports = router;