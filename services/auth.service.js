const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const UserService = require("./user.service");
const UserServiceInstance = new UserService();

class AuthService {
  //   signup = async (body) => User.create(body);
  signup = async (body) => {
    const hashedPassword = await this.hashPassword(body.password);
    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();
    return newUser;
  };

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  verifyPassword = async (password, hashedPassword) =>
    bcrypt.compare(password, hashedPassword);

  login = async (body) => {
    const { username, password } = body;
    const response = await UserServiceInstance.findByUsername(username);
    if (response === null) throw Error("User not found");
    if (await this.verifyPassword(password, response.password))
      return "success";
    return "failure";
  };
}

module.exports = AuthService;
