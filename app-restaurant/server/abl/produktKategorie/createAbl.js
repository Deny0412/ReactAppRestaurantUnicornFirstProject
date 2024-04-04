const Ajv = require("ajv");
const ajv = new Ajv();

const produktKategorieDao = require("../../dao/produktKategorie-dao.js");
const produktDao = require("../../dao/produkt-dao.js");
const kategorieDao = require("../../dao/kategorie-dao.js");

const schema = {
  type: "object",
  properties: {
    kategorieId: { type: "string" },
    produktId: { type: "string" },
  },
  required: ["kategorieId", "produktId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    const produktKategorie = req.body;

    // validate input
    const valid = ajv.validate(schema, produktKategorie);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    if (produktDao.get(produktKategorie.produktId)) {
    } else {
      res.status(400).json({
        code: "produktDoesNotExist",
        message: "produkt does not exist",
      });
      return;
    }
    if (kategorieDao.get(produktKategorie.kategorieId)) {
    } else {
      res.status(400).json({
        code: "kategoriDoesNotExist",
        message: "kategorie does not exist",
      });
      return;
    }
    produktKategorie = produktKategorieDao.create(produktKategorie);
    res.json(produktKategorie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
