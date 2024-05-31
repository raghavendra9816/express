const router = require("express").Router();
const { secure } = require("../../utils/secure");
const movieController = require("./movie.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/movies");
  },
  filename: function (req, file, cb) {
    console.log({ file }, Date.now());
    const extension = file.originalname.split(".").pop();
    cb(
      null,
      file.originalname.replace(/\.[^/.]+$/, "") + Date.now() + "." + extension //profile-122352.jpg
    );
  },
});

const upload = multer({ storage: storage, createParentPath: true });
//create movie
router.post(
  "/",
  secure(["admin"]),
  upload.single("poster"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.poster = req.file.path;
      }
      const result = await movieController.create(req.body);
      res.json({ msg: "created new movies created ", data: result });
    } catch (e) {
      next(e);
    }
  }
);
//read one movie
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const result = movieController.getById(id);
    res.json({ msg: `read one movie by id ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

//update movies
router.put("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.update(req.body);
    res.json({ msg: `update movie by id ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});
//delete
router.delete("/:id", secure(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.remove(id);
    res.json({ msg: `update movie by id ${id}`, data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
