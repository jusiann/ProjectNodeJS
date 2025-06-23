const router = require("express").Router();
const {login, register, me} = require("../controllers/auth.controller");
const AUTH_VALIDATION = require("../middlewares/validations/auth.validation");
const {checkToken} = require("../middlewares/auth");
router.post("/login", AUTH_VALIDATION.loginAction, login);
router.post("/register", AUTH_VALIDATION.registerAction, register);
router.get("/me", checkToken, me)
module.exports = router;