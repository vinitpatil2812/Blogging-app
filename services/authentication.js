const JWT = require("jsonwebtoken");

const SECRET = "";

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
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