const JWT = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
    throw new Error('JWT_SECRET environment variable is required');
}

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
    };
    const token = JWT.sign(payload, secretKey, { expiresIn: '1d' });
    return token;
}

function validateToken(token) {
    return JWT.verify(token, secretKey);
}

module.exports = {
    createTokenForUser,
    validateToken
};