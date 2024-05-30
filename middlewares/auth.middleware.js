const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const verifyJwtAndAppendUserToReq = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = await AuthServiceInstance.verifyToken(token);
    console.log(req.user);
    next();
  } catch (error) {
    if (error.message === "jwt expired") return res.sendStatus(401);
    return res.sendStatus(500);
  }
};

module.exports = verifyJwtAndAppendUserToReq;
