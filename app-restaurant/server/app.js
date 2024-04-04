const express = require("express");
const app = express();
const port = 8000;

const restauraceController = require("./controller/restaurace");
const produktController = require("./controller/produkt");
const kategorieController = require("./controller/kategorie");
const produktKategorieController = require("./controller/produktKategorie");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("zkouska!");
});

app.use("/restaurace", restauraceController);
app.use("/produkt", produktController);
app.use("/kategorie", kategorieController);
app.use("/produktKategorie", produktKategorieController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
