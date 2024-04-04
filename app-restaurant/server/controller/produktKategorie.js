const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/produktKategorie/getAbl");
const CreateAbl = require("../abl/produktKategorie/createAbl");
const DeleteAbl = require("../abl/produktKategorie/deleteAbl");
const ListAbl = require("../abl/produktKategorie/listAbl");

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.post("/get", (req, res) => {
  GetAbl(req, res);
});
router.post("/list", (req, res) => {
  ListAbl(req, res);
});

module.exports = router;
