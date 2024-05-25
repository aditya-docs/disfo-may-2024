const router = require("express").Router();
const { postSignup, postLogin } = require("../controllers/auth.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const { fetchUsernameInCollection } = require("../middlewares/user.middleware");

const userValidationSchema = require("../validations/user.validator");
const loginBodyValidationSchema = require("../validations/auth.validator");

const validateUser = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);

router.post("/signup", validateUser, postSignup);
router.post("/login", validateLogin, fetchUsernameInCollection, postLogin);

module.exports = router;
