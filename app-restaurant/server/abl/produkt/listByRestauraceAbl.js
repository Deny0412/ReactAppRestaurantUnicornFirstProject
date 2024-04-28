const produktDao = require("../../dao/produkt-dao.js");

async function ListByRestauraceAbl(req, res) {
  try {
    reqParams = req.query;

    const produktList = produktDao
      .list()
      .filter((item) => item.restauraceId === reqParams.restauraceId);

    res.json(produktList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListByRestauraceAbl;
