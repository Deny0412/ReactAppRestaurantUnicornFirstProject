const Ajv = require("ajv");
const ajv = new Ajv();

const produktKategorieDao = require("../../dao/produktKategorie-dao.js");

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
    let produktKategorie = req.body;
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
    if (
      produktKategorieDao.get(
        produktKategorie.kategorieId,
        produktKategorie.produktId
      )
    ) {
      res.status(400).json({
        code: "produktKategorieAlreadyExists",
        message: "produktKategorie already exists",
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
