const slugify = require("slugify");

const slugger = (text) => {
  return slugify(text, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: false,
    locale: "vi",
    trim: true,
  });
};
module.exports = { slugger };
