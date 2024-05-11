/* 
create 
list
read one order
delete the order
change the ststus of order

*/

const router = require("express").Router();
const { mw } = require("../../utils/secure");

//specific router level middleware
// const mw = (req, res, next) => {
//   const { username, password } = req.headers;
//   if (username === "achyut" && password === "123") {
//     res.json({ msg: "succssful login" });
//     next();
//   }
//   res.status(404).json({ msg: "unauthorized" });
// };

//
router.get("/", mw(["admin"]), (req, res, next) => {
  try {
    res.json({ msg: "orders api", data: req.body });
  } catch (e) {
    next(e);
  }
});
//create
router.post("/", mw(["user", "admin"]), (req, res, next) => {
  try {
    res.json({ msg: "created one order" });
  } catch (e) {
    next(e);
  }
});
router.get("/", (req, res, next) => {
  try {
    res.json({ msg: "list of all  order" });
  } catch (e) {
    next(e);
  }
});
//read one order
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    res.json({ msg: `orsder read by ${id}` });
  } catch (e) {
    next(e);
  }
});
//delete
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `order is deleted by ${id}` });
  } catch (e) {
    next(e);
  }
});
//change the ststus
router.patch("/:id/ststus", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `order status change by id ${id}` });
  } catch (e) {
    next(e);
  }
});

//update orders
router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `update order ststus by id ${id}` });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
