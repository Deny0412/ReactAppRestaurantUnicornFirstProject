const Ajv = require("ajv");
const ajv = new Ajv();
const kategorieDao = require("../../dao/produktKategorie-dao.js");

const schema = {
  type: "object",
  properties: {
    kategorieId: { type: "string" },
    produktId: { type: "string" },
  },
  required: ["kategorieId", "produktId"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

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

    kategorieDao.remove(reqParams.id);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
