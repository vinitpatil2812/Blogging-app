const { Router } = require("express");

const router = Router();

router.get("/add", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/add", (req, res) => {
    return res.redirect("/");
});

module.exports = router;