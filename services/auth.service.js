const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

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

  login = async (password, reqUser) => {
    if (await this.verifyPassword(password, reqUser.password)) {
      return {
        isLoggedIn: true,
        token: await this.generateToken({
          userId: reqUser._id,
          permissions: [
            {
              endpoint: "/profile",
              methods: ["get"],
            },
            {
              endpoint: "/profile/settings",
              methods: ["post", "get"],
            },
          ],
        }),
      };
    }
    return {
      isLoggedIn: false,
    };
  };

  generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1m",
    });
    return token;
  };

  verifyToken = async (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = AuthService;
