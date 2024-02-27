const { Router } = require("express");
const { handleSignin, handleSignup } = require("../controllers/user");

const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signin", handleSignin);

router.post("/signup", handleSignup);

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
}); 


module.exports = router;