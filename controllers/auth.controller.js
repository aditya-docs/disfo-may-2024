const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    const response = await AuthServiceInstance.signup(req.body);
    res.status(201).send(response);
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).send({
        message: `${
          Object.keys(error.keyPattern)[0]
        } already exists. Please login!`,
      });
    res
      .status(500)
      .send({ message: "Oops! Something went wrong. Please try again!" });
  }
};

const postLogin = async (req, res) => {
  try {
    const response = await AuthServiceInstance.login(req.body);
    if (response === "success")
      return res.status(200).send({ message: "Login successful" });
    res.status(401).send({ message: "password is incorrect" });
  } catch (error) {
    if (error.message.includes("not found"))
      return res.status(404).send({ message: "Username could not be found" });
    res
      .status(500)
      .send({ message: "Oops! Something went wrong. Please try again!" });
  }
};

module.exports = { postSignup, postLogin };
