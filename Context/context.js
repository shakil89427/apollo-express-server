const jwt = require("jsonwebtoken");

const context = ({ req }) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const auth = jwt.verify(token, process.env.JWT_SECRET);
    return auth;
  } catch (error) {}
};

module.exports = context;
