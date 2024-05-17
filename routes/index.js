const router = require("express").Router();
const morgan = require("morgan");
const movieRouter = require("../modules/movies/movie.api");
const orderRouter = require("../modules/orders/order.api");
const userRouter = require("../modules/users/user.api");

router.get("/api/v1", (req, res, next) => {
  try {
    res.json({ msg: "MovieMate Api is Working" });
  } catch (e) {
    next(e);
  }
});

//How to connect modules from routrer index.js
router.use("/api/v1/movies", movieRouter);
router.use("/api/v1/orders", orderRouter);
router.use("/api/v1/users", userRouter);

module.exports = router;
