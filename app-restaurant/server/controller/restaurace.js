const express = require("express");
const router = express.Router();

const List = require("../abl/restaurace/list");
const Update = require("../abl/restaurace/update");

router.get("/get", (req, res) => {
  console.log(req.query);
  res.send("getting users!");
});

router.get("/list", (req, res) => {
  List(req, res);
});

router.post("/update", (req, res) => {
  Update(req, res);
});

module.exports = router;
