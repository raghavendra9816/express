require("dotenv").config();
const express = require("express");
const app = express();
const PORT = Number(process.env.PORT);
app.get("/", (req, res) => {
  res.json({ msg: "hello devlopers" });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
