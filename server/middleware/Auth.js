const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, Authorization deined." });

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, Authorization deined." });

    req.user = verified.id;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
