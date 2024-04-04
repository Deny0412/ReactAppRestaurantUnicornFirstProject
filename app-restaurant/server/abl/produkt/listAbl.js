const produktDao = require("../../dao/produkt-dao.js");

async function ListAbl(req, res) {
  try {
    const produktList = produktDao.list();

    res.json(produktList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
