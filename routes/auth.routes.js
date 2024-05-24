const router = require("express").Router();
const { postSignup, postLogin } = require("../controllers/auth.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const {
  userValidationSchema,
  loginValidationSchema,
} = require("../validations/user.validator");

const validateUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginValidationSchema);

router.post("/signup", validateUser, postSignup);
router.post("/login", validateLogin, postLogin);

module.exports = router;
