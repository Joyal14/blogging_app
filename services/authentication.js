const JWT = require('jsonwebtoken');

const secretKey = "your-secret-key"; // Replace with your own secret key

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        profileImage: user.profileImage,role: user.role};
        const token = JWT.sign(payload, secretKey);
        return token;
}

function validateToken(token) {
    return JWT.verify(token, secretKey);
}

module.exports = {
    createTokenForUser,
    validateToken
};