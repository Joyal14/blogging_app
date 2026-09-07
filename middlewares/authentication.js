const { validateToken } = require("../services/authentication");
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const authorization = req.headers.authorization;
    const bearerToken = authorization && authorization.startsWith('Bearer ')
      ? authorization.slice(7)
      : null;
    const token = bearerToken || req.cookies[cookieName];
    if (!token) {
      return next();
    }

    try {
      const payload = validateToken(token);
      req.user = payload;
    } catch (error) {
      return next();
    }

    return next();

  };
}

module.exports = {
  checkForAuthenticationCookie,
};
