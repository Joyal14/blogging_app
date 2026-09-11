const JWT = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || "your-secret-key";

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
    };
    const token = JWT.sign(payload, secretKey,);
    return token;
}

function validateToken(token) {
    return JWT.verify(token, secretKey);
}

module.exports = {
    createTokenForUser,
    validateToken
};