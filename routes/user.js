const { Router } = require("express");
const router = Router();
const {
  renderHome,
  renderSignin,
  renderSignup,
  createUser,
  signinUser,
  logoutUser,
} = require("../controllers/user");

router.get("/", renderHome);
router.get("/signin", renderSignin);
router.get("/signup", renderSignup);
router.post("/signin", signinUser);
router.post("/signup", createUser);
router.get("/logout", logoutUser);
module.exports = router;
