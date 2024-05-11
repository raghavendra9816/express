require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware For Parsing JSON Body
//I can pass req body as json
app.use(express.json());

//middle ware for over all application
app.use((req, res, next) => {
  req.body.country = "np";
  req.body.currency = "npr";
  req.body.currentTIme = new Date().toISOString();
  next();
});

//i am the routing mechanism, i will send the API request from / to indexRouter
app.use("/", indexRouter);

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
