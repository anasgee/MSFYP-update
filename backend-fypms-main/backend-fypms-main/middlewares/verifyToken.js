const dotenv = require("dotenv");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./env"});

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    // console.log("token", token)
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // console.log("token.............")
    req.userId = decoded._id;
    next();
  } catch (err) {

    console.log("errr", err)
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
