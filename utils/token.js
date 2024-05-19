const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (payload) =>
  jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
const checkRole = ({ sysRole, userRole }) => {
  userRole.some((role) => sysRole.includes(role));
};
const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

module.exports = { generateOtp, checkRole, generateToken, verifyToken };
