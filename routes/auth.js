const router = require("express").Router();
const auth = require("../controllers/authController");
const restrict = require("../middleware/restrict");

router.get("/timeout", auth.timeout);
router.get("/interval", auth.interval);
router.get("/even", auth.even);
router.post("/login", auth.login);

router.post("/register", auth.register);
router.get("/whoami", restrict, auth.whoami);

module.exports = router;
