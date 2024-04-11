const restauraceDao = require("../../dao/restaurace-dao.js");
const produktKategorieDao = require("../../dao/produktKategorie-dao.js");
const produktDao = require("../../dao/produkt-dao.js");

async function ListByFiltersAbl(req, res) {
  try {
    const filters = req.body;
    //zjistíme jaké kategorie patří do filters.kategorieId
    const produktKategorieList = produktKategorieDao
      .list()
      .filter((item) => item.kategorieId === filters.kategorieId);

    let produktList = [];
    produktKategorieList.forEach((item) => {
      produktList.push(produktDao.get(item.produktId));
    });

    let restauraceList = [];
    produktList.forEach((item) => {
      if (
        !restauraceList.some(
          (restaurace) => restaurace.id === item.restauraceId
        )
      ) {
        restauraceList.push(restauraceDao.get(item.restauraceId));
      }
    });

    if (filters.hasOwnProperty("mesto")) {
      restauraceList = restauraceList.filter(
        (item) => item.adresa.split(",")[0] === filters.mesto
      );
    }

    res.json(restauraceList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListByFiltersAbl;
