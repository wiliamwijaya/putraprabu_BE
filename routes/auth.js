const router = require("express").Router();
const auth = require("../controllers/authController");
const restrict = require("../middleware/restrict");

router.post("/login", auth.login);
router.post("/register", auth.register);

module.exports = router;
