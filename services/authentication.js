const JWT = require("jsonwebtoken");

const SECRET = "key";

function createTokenForUser(user) {
    const payload = {
        user,
        // id: user._id,
        // email: user.email,
    }

    const token = JWT.sign(payload, SECRET);
    
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, SECRET);

    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}