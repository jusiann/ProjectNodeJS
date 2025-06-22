const router = require("express").Router();
const {login, register} = require("../controllers/auth.controller");
const AUTH_VALIDATION = require("../middlewares/validations/auth.validation");
router.post("/login", login);
router.post("/register", AUTH_VALIDATION.register, register);
module.exports = router;