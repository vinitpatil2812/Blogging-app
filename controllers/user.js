const User = require("../models/user");

const handleSignin = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        return res.cookie("token", token).redirect("/");
    }
    catch (error) {
        return res.render("signin", {
            error,
        });
    }
}

const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

module.exports = {
    handleSignin,
    handleSignup,
};