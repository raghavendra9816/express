const joi = require("joi");
//schema define
const userSchema = joi.object({
  name: joi.string(),
  email: joi
    .string()
    .email({ minDomainSegments: 1, tlds: { allow: ["com"] } })
    .required(),
  password: joi.string().required(),

  roles: joi.array().items(joi.string().valid("admin", "user")),
  image: joi.string(),
  isEmailVerified: joi.boolean(),
});
// middleware define
const validator = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next(e);
  }
};
module.exports = { validator };
