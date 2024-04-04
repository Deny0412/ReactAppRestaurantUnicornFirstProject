const Ajv = require("ajv");
const ajv = new Ajv();

const kategorieDao = require("../../dao/kategorie-dao.js");

const schema = {
  type: "object",
  properties: {
    nazev: { type: "string" },
  },
  required: ["nazev"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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
    if (alreadyExists(kategorie.nazev)) {
      res.status(400).json({
        code: kategorie.nazev + " already exists",
        message: "kategorie already exists",
      });
      return;
    }
    kategorie = kategorieDao.create(kategorie);
    res.json(kategorie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

function alreadyExists(kategorieNazev) {
  const kategorieList = kategorieDao.list();

  // Použití metody find pro nalezení kategorie podle názvu
  const foundKategorie = kategorieList.some(
    (kategorie) => kategorie.nazev === kategorieNazev
  );
  return foundKategorie;
}

module.exports = CreateAbl;
