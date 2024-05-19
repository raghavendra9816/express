/*
register user
login user
forget password
change password
reset password
verify token
change ststus of user
delet user
update user
update my profile
get one user


*/

const router = require("express").Router();
require("dotenv").config();
const multer = require("multer");
const usercontroller = require("./user.controller");
const { secure } = require("../../utils/secure");

const { validator } = require("./user.validator");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
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

router.get("/", (req, res, next) => {
  res.json({ msg: "user is running" });
});

// list of users
router.get("/", secure(["admin"]), (req, res, next) => {
  try {
    res.json({ msg: "list of all user" });
  } catch (e) {
    next(e);
  }
});

// register user
router.post(
  "/register",
  upload.single("profile"),
  validator,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profile = req.file.path;
      }

      const result = await usercontroller.create(req.body);

      res.json({ msg: "user registered successfully", data: result });
    } catch (e) {
      console.error("Error registering user:", e);
      res.status(500).json({ error: e.message });
    }
  }
);

//login user
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await usercontroller.login(req.body);
    res.json({ msg: "user successfully login", data: result });
  } catch (e) {
    next(e);
  }
});
//generrate email token
router.post("/generate-email-token", async (req, res, next) => {
  try {
    const result = await usercontroller.generateEmailToken(req.body);
    res.json({ msg: "email successfully sent ", data: result });
  } catch (e) {
    next(e);
  }
});

//email verification
router.post("/verify-email", async (req, res, next) => {
  try {
    const result = await usercontroller.verifyEmailToken(req.body);
    res.json({ msg: "email successfully verified", data: result });
  } catch (e) {
    next(e);
  }
});
//forgot password
// router.post("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: `forgot password by id ${id}` });
//   } catch (e) {
//     next(e);
//   }
// });
//change password
//router.patch("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: "password is changed" });
//   } catch (e) {
//     next(e);
//   }
// });
//reset password
// router.post("/", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: "password is reset" });
//   } catch (e) {
//     next(e);
//   }
// });
////verify token
// router.post("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: "token is verified" });
//   } catch (e) {
//     next(e);
//   }
// });
// //change ststus of user
// router.patch("/", (req, res, next) => {
//   try {
//     res.json({ mag: "status is changed" });
//   } catch (e) {
//     next(e);
//   }
// });
// //delet user
// router.delete("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: "user is deleted" });
//   } catch (e) {
//     next(e);
//   }
// });
// //update user
// router.patch("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: `user is updated by id ${id}` });
//   } catch (e) {
//     next(e);
//   }
// });

// //update my profile
// router.patch("/", (req, res, next) => {
//   try {
//     res.json({ mag: "profile is updated" });
//   } catch (e) {
//     next(e);
//   }
// });
// //get one user
// router.get("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json({ mag: `get the user by id ${id}` });
//   } catch (e) {
//     next(e);
//   }
// });
module.exports = router;
