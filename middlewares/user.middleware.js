const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const fetchUserInCollection = async (req, res, next) => {
  try {
    const { author } = req.body;
    const user = await UserServiceInstance.findByUsername(author);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found!", username: author });
    else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Could not find user" });
  }
};

const fetchUsernameInCollection = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await UserServiceInstance.findByUsername(username);
    if (!user)
      return res.status(404).json({ message: "User not found!", username });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Could not find user" });
  }
};

module.exports = {
  fetchUserInCollection,
  fetchUsernameInCollection,
};
