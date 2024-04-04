const Ajv = require("ajv");
const ajv = new Ajv();
const produktkategorieDao = require("../../dao/produktKategorie-dao.js");

const schema = {
  type: "object",
  properties: {
    kategorieId: { type: "string" },
    produktId: { type: "string" },
  },
  required: ["kategorieId", "produktId"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;
    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read produktkategorie by given id
    const produktkategorie = produktkategorieDao.get(
      reqParams.kategorieId,
      reqParams.produktId
    );
    if (!produktkategorie) {
      res.status(404).json({
        code: "produktkategorieNotFound",
        message: `ProduktKategorie ${reqParams.id} not found`,
      });
      return;
    }

    res.json(produktkategorie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
