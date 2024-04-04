const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");

const produktDao = require("../../dao/produkt-dao.js");
const restauraceDao = require("../../dao/restaurace-dao.js");

const schema = {
  type: "object",
  properties: {
    nazev: { type: "string" },
    popis: { type: "string" },
    cena: { type: "number" },
    alergeny: { type: "string" },
    vahagramy: { type: "number" },
    restauraceId: { type: "string" },
  },
  required: ["nazev", "popis", "cena", "alergeny", "vahagramy", "restauraceId"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let produkt = req.body;

    // validate input
    const valid = ajv.validate(schema, produkt);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    if (restauraceDao.get(produkt.restauraceId)) {
    } else {
      res.status(400).json({
        code: "restauraceDoesNotExist",
        message: "restaurace does not exist",
      });
      return;
    }

    produkt = produktDao.create(produkt);
    res.json(produkt);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
