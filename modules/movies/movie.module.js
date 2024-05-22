const { required } = require("joi");
const { Schema, model } = require("mongoose");
//shema
const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String },
    duration: { type: String, required: true },
    synopsis: { type: String },
    poster: { type: String, required: true },
    releaseDate: { type: Date, required: true, default: Date.now },
    endDate: { type: String, required: true, default: Date.now },
    seats: { type: Number, required: true, default: 0 },
    //to do
    //createdBy:{}
  },
  { timestamps: true }
);
module.export = model("Movie", movieSchema);
