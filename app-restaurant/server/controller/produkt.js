const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/produkt/getAbl");
const ListAbl = require("../abl/produkt/listAbl");
const CreateAbl = require("../abl/produkt/createAbl");
const UpdateAbl = require("../abl/produkt/updateAbl");
const DeleteAbl = require("../abl/produkt/deleteAbl");
const ListByRestaurant = require("../abl/produkt/listByRestauraceAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});
router.get("/list", (req, res) => {
  ListAbl(req, res);
});
router.get("/listByRestaurant", (req, res) => {
  ListByRestaurant(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

module.exports = router;
