const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/restaurace/getAbl");
const ListAbl = require("../abl/restaurace/listAbl");
const CreateAbl = require("../abl/restaurace/createAbl");
const UpdateAbl = require("../abl/restaurace/updateAbl");
const DeleteAbl = require("../abl/restaurace/deleteAbl");
const ListByFiltersAbl = require("../abl/restaurace/listByFiltersAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
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

router.get("/listByFilters", (req, res) => {
  ListByFiltersAbl(req, res);
});

module.exports = router;
