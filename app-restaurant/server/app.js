const express = require("express");
const app = express();
const port = 8000;

const restauraceController = require("./controller/restaurace");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("zkouska!");
});

app.use("/restaurace", restauraceController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
