const Ajv = require("ajv");
const ajv = new Ajv();

const kategorieDao = require("../../dao/kategorie-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    nazev: { type: "string" },
  },
  required: ["id", "nazev"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let kategorie = req.body;

    // validate input
    const valid = ajv.validate(schema, kategorie);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedKategorie = kategorieDao.update(kategorie);

    if (!updatedKategorie) {
      res.status(404).json({
        code: "kategorieNotFound",
        message: `Kategorie ${kategorie.id} not found`,
      });
      return;
    }

    res.json(updatedKategorie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
