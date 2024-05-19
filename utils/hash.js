const bcrypt = require("bcryptjs");

const generateHash = (payload) => {
  return bcrypt.hashSync(payload, Number(process.env.SALT_ROUND));
};
const compareHash = (hashpayload, payload) => {
  return bcrypt.compareSync(payload, hashpayload);
};

module.exports = { generateHash, compareHash };
