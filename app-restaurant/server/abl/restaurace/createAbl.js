const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");

const restauraceDao = require("../../dao/restaurace-dao.js");

//regex pro validaci telefonniho cisla
const telefonniCisloRegex = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
ajv.addFormat("telefon", {
  type: "string",
  validate: function (input) {
    return telefonniCisloRegex.test(input);
  },
});
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    nazev: { type: "string" },
    adresa: { type: "string" },
    telefon: { type: "string", format: "telefon" },
    email: { type: "string", format: "email" },
    popis: { type: "string" },
    otviraciHodiny: { type: "string" },
  },
  required: ["nazev", "adresa", "telefon", "email"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let restaurace = req.body;

    // validate input
    const valid = ajv.validate(schema, restaurace);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    restaurace = restauraceDao.create(restaurace);
    res.json(restaurace);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
