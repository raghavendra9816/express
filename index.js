require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes");
const morgan = require("morgan");
const mongoose = require("mongoose");

// MONGO DB CONNECTION
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  })
  .catch((e) => {
    console.log("Database error:", e);
  });

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware For Parsing JSON Body
//I can pass req body as json
app.use(express.json());
app.use(morgan("dev")); //yesle le chai kun router le hit garo vanera dekhaucha
app.use(express.static("public")); //yo chai server mai file upload garna ra dekhauna lai public if
// hamle browser ma gayera localhost:8000/image/boy.png.png hit garau vana image dekhincha

//middle ware for over all application
app.use((req, res, next) => {
  req.body.country = "np";
  req.body.currency = "npr";
  req.body.currentTIme = new Date().toISOString();
  next();
});

//i am the routing mechanism, i will send the API request from / to indexRouter
app.use("/", indexRouter);

//error handler
app.use((err, req, res, next) => {
  const errorMsg = err ? err.toString() : "something went wrong";
  res.status(500).json({ msg: "server error message" });
});

// Run the application on the specified port
app.listen(PORT, () => {
  console.log(`The Application Is Running On Port: ${PORT}`);
});
//=================server start garna ra routes sanga link garna=============================
// require("dotenv").config();
// const express = require("express");
// const PORT = process.env.PORT;
// const app = express();
// const indexRouter = require("./routes");
// app.use(express.json());
// app.use("/", indexRouter);// yo middleswhare ho jasle / aauni bitikai riutes ko page ma lagcha

// app.listen(PORT, () => console.log(`running on port: ${PORT}`));
//==================================================================================
