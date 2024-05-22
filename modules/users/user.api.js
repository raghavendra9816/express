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

// list of users
router.get("/list", secure(["admin"]), async (req, res, next) => {
  try {
    //tOdo aDVANCE oPERATION
    const data = await usercontroller.list();
    console.log({ data });
    res.json({ msg: "list of all user", data });
  } catch (e) {
    next(e);
  }
});

//user id block patch method is for single data update garna
router.patch("/:id/block", secure(["admin"]), async (req, res, next) => {
  try {
    const payload = req.params.id;
    const result = await usercontroller.blockuser(payload);
    res.json({ msg: "user status updated successfully", data: result });
  } catch (e) {
    next(e);
  }
});

//delet user
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await usercontroller.removeById(req.params.id);
    console.log({ result });
    res.json({ msg: "user deleted successfully", data: result });
  } catch (e) {
    next(e);
  }
});

//user profile
router.get("/profile", secure(), async (req, res, next) => {
  try {
    const result = await usercontroller.getProfile(req.currentUser);
    console.log({ result });
    res.json({ msg: "user profile generated", data: result });
  } catch (e) {
    next(e);
  }
});

//update =>put method for dherai data update garna
router.put("/profile", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});
//user detail of each individual user
router.get("/id", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

//change password
router.post("/change-password", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});
//reset password
router.post("/reset-password", async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});
//forget password
router.post("/forget-password", (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

module.exports = router;
