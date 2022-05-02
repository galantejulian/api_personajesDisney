const router = require("express").Router();
const { register, login } = require("../controllers/auth");
const registerValidation = require("../validations/register");

router.post('/register', registerValidation, register)
router.post('/login', login)

module.exports = router