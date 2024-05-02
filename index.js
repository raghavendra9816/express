require("dotenv").config();
const express = require("express");
const app = express();
const PORT = Number(process.env.PORT);
app.use(express.json());
app.get("/", (req, res) => {
  console.log({
    query: req.query,
    params: req.params,
    body: req.body,
  });
  res.json({ msg: "hello devlopers baddda" });
});

//client le send garcha data
app.post("/:id", (req, res) => {
  console.log({ query: req.query, params: req.params, body: req.body });
  res.json({ msg: "hello devlopers baddda" });
});

//client bata data send huncha i.e frontend bnata
app.put("/:id", (req, res) => {
  console.log({ query: req.query, params: req.params, body: req.body });
  res.json({ msg: "hello devlopers baddda" });
});

//client bata data ssend huncha
app.patch("/:id", (req, res) => {
  console.log({ query: req.query, params: req.params, body: req.body });
  res.json({ msg: "hello devlopers baddda" });
});

//NOte it down that put patch post method bata data send huncha i.e frontend bata pathacuha
app.delete("/", (req, res) => {
  res.json({ msg: "hello devlopers baddda" });
});
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
