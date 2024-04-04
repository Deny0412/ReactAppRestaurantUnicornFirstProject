const Ajv = require("ajv");
const ajv = new Ajv();

const produktKategorieDao = require("../../dao/produktKategorie-dao.js");

async function ListAbl(req, res) {
  try {
    const produktKategorieList = produktKategorieDao.list();

    res.json(produktKategorieList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
