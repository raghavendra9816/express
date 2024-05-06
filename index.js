// require("dotenv").config();
// const express = require("express");
// const app = express();
// const PORT = Number(process.env.PORT);
// app.use(express.json());

// //register user
// app.post("/register", (req, res) => {
//   res.json({ msg: "register" });
// });

// //loginuser
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   //LOGIC
//   console.log({ email, password });
//   res.json({ msg: "login" });
// });

// app.listen(PORT, () => {
//   console.log(`app running on port ${PORT}`);
// });

// //client le send garcha data
// app.post("/:id", (req, res) => {
//   console.log({ query: req.query, params: req.params, body: req.body });
//   res.json({ msg: "hello devlopers baddda" });
// });

// //client bata data send huncha i.e frontend bnata
// app.put("/:id", (req, res) => {
//   console.log({ query: req.query, params: req.params, body: req.body });
//   res.json({ msg: "hello devlopers baddda" });
// });

// //client bata data ssend huncha
// app.patch("/:id", (req, res) => {
//   console.log({ query: req.query, params: req.params, body: req.body });
//   res.json({ msg: "hello devlopers baddda" });
// });

// //NOte it down that put patch post method bata data send huncha i.e frontend bata pathacuha
// app.delete("/", (req, res) => {
//   res.json({ msg: "hello devlopers baddda" });
// });
// app.listen(PORT, () => {
//   console.log(`app running on port ${PORT}`);
// });

//#######################################################
//HANDLING METHOD KO COPY BECAUSE HAMI ORIGINAL LAI BIGARDAINAU
require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware For Parsing JSON Body
//I can pass req body as json
app.use(express.json());

//i am the routing mechanism, i will send the API request from / to indexRouter

app.use("/", indexRouter);

// Run the application on the specified port
app.listen(PORT, () => {
  console.log(`The Application Is Running On Port: ${PORT}`);
});
