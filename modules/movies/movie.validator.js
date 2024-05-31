// const Joi = require("joi");

// const movieSchema = Joi.object({
//   title: Joi.string().required(),
//   duration: Joi.string().required(),
//   synopsis: Joi.string().optional(),
//   poster: Joi.string().required(),
//   releaseDate: Joi.date()
//     .default(() => new Date(), "current date")
//     .required(),
//   endDate: Joi.date()
//     .default(() => new Date(), "current date")
//     .required(),
//   seats: Joi.number().integer().default(0).required(),
// });

// const movieValidate = async (req, res, next) => {
//   try {
//     // Validate the movie using the movieSchema
//     await movieSchema.validateAsync(req.body);
//     next(); // If validation passes, move to the next middleware
//   } catch (e) {
//     // If validation fails, pass the error to the error handling middleware
//     next(e);
//   }
// };

// module.exports = { movieValidate };
