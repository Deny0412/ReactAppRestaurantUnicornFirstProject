const restauraceDao = require("../../dao/restaurace-dao.js");

async function ListAbl(req, res) {
  try {
    const restauraceList = restauraceDao.list();

    res.json(restauraceList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
