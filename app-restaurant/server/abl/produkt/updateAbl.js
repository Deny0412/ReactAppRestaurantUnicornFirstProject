const Ajv = require("ajv");
const ajv = new Ajv();

const produktDao = require("../../dao/produkt-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    nazev: { type: "string" },
    popis: { type: "string" },
    cena: { type: "number" },
    alergeny: { type: "string" },
    vahagramy: { type: "number" },
    restauraceId: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

    const updatedProdukt = produktDao.update(produkt);

    if (!updatedProdukt) {
      res.status(404).json({
        code: "produktNotFound",
        message: `Produkt ${produkt.id} not found`,
      });
      return;
    }

    res.json(updatedProdukt);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
