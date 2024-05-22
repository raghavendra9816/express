//movie create
//list movies
//get 1 movie by id
//update release date//update movie detail
//update seats

//delete movie

const moviemodule = require("./movie.module");
//movie create
const create = (payload) => {
  const { title, duration, posture } = payload;
  payload.title = req.body;
};
//list movies
const listMovie = () => {
  return moviemodule.find();
};

//get movie by id
const getMovieById = (id) => {};

//update movie release date
const updateReleaseDate = (id, payload) => {};

module.exports = {
  create,
  listMovie,
  getMovieById,
  updateReleaseDate,
};
