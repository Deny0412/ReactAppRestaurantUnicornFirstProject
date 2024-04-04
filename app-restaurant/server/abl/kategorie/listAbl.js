const kategorieDao = require("../../dao/kategorie-dao.js");

async function ListAbl(req, res) {
  try {
    const kategorieList = kategorieDao.list();

    res.json(kategorieList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
