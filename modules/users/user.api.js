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
const event = require("events");
const router = require("express").Router();
require("dotenv").config();
const multer = require("multer");
const { secure } = require("../../utils/secure");
//const { validator } = require("./user.validator");

const { generateToken } = require("../../utils/token");
const { sendMail } = require("../../services/mailer");
const { validator } = require("./user.validator");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    console.log({ file }, Date.now());
    cb(
      null,
      file.originalname.concat(Date.now(), ".", file.filename.split(".")[1]) //profile-122352.jpg
    );
  },
});

const upload = multer({ storage: storage });
const eventEmitter = new event.EventEmitter();

router.get("/", (req, res, next) => {
  res.json({ msg: "user is running" });
});

//list of users
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
  (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(req.body, req.file);
      if (!email) throw new Error("email is missing");
      //call the node mailer
      eventEmitter.addListener("signup", (email) =>
        sendMail({
          email,
          subject: "movie Mate sign up",
          htmlmsg: "<b>thank you for joining movie mate</b>",
        })
      );
      eventEmitter.emit("signup", email);
      res.json({ msg: "user register successfully" });
    } catch (e) {
      next(e);
    }
  }
);

//login user
router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "achyut@gmail.com" && password === "1234") {
      //generate the  token
      const payload = { email, role: "admin" };
      const token = generateToken(payload);
      console.log(token);
      res.json({ msg: "user logged in successfully", data: token });
    } else {
      res.json({ mag: "email password invalis", data: "" });
    }
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

/// today ko code
/*
const router =require{"express"}.Router();
const {generateToken}=require("../../utils/token");
const {secure}=require("../../utils/secure");


router.get("/",secure(["admin"]),(req,res,next)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password) throw new Error("Emaoil or password is invalid");
    if(email==="achyut@gmail.com" && password==="1234")
      {
        /generate jwt token
        const payload={email, roles}
      }
  }catch(e){next(e)}
});



*/
