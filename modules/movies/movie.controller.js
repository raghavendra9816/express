const moviemodule = require("./movie.module");
const { slugger } = require("../../utils/text");

//movie create
const create = async (payload) => {
  //create slug from title
  const slug = slugger(payload?.title);
  //check if the slug exist in the db
  const movie = await moviemodule.findone({ slug });

  if (movie) throw new Error("movie title is already in use");
  //create moovie
  payload.slug = slug;
  return moviemodule.create(payload);
};
//list movies
const list = () => {
  return moviemodule.find();
};

//get one movie by id
const getById = (slug) => {
  return moviemodule.findone({ slug });
};

//update movie release date
const updateReleaseDate = (slug, payload) => {
  //check releasedate is less than today {using moment ,luxon,date-fns any of these three}
  return moviemodule.findOneAndUpdate({ slug }, payload, { new: true });
};
//update movie details
const update = (slug, payload) => {
  if (payload.title) {
    payload.slug = slugger(payload?.title);
  }
  return moviemodule.updateOne({ slug }, payload);
};
//update seats
const updateSeats = async (slug, payload) => {
  const movie = await moviemodule.findOne({ slug });
  if (payload.seats < Number(process.env.NO_OF_SEATS)) {
    throw new Error(`Movie seats cant be less than ${process.env.NO_OF_SEATS}`);
  }
  return moviemodule.findOneAndUpdate({ slug }, payload, { new: true });
};
//delete movies(remove)
const remove = async (slug) => {
  const movie = await movieModel.findOne({ slug });
  // movie ticket should not be sold
  if (
    moment(movie?.releaseDate).isBefore(moment()) &&
    moment(movie?.endDate).isAfter(moment())
  ) {
    throw new Error("Movie is currently running...");
  }
  return moviemodule.deletOne({ slug });
};
module.exports = {
  update,
  getById,
  updateSeats,
  remove,
  create,
  list,
  updateReleaseDate,
};
