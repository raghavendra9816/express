/*
create
read only one movie
update
delete
list
update the seats of one movie
change the register of one movie



*/

const router = require("express").Router();
//create movie
router.post("/", (req, res, next) => {
  try {
    res.json({ msg: "movies created " });
  } catch (e) {
    next(e);
  }
});
//read one movie
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `read one movie by id ${id}`, data: req.body });
  } catch (e) {
    next(e);
  }
});

//update movies
router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    res.json({ msg: `update movie by id ${id}` });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
