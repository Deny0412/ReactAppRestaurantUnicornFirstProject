const Ajv = require("ajv");
const ajv = new Ajv();
const kategorieDao = require("../../dao/kategorie-dao.js");

const schema = {
  type: "object",
  properties: {
    nazev: { type: "string" },
    id: { type: "string" },
  },
  required: ["id"],
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
    // read kategorie by given id
    const kategorie = kategorieDao.get(reqParams.id);
    if (!kategorie) {
      res.status(404).json({
        code: "kategorieNotFound",
        message: `Kategorie ${reqParams.id} not found`,
      });
      return;
    }

    res.json(kategorie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
