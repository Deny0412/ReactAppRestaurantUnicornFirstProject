const fs = require("fs").promises;
const path = require("path");

async function update(req, res) {
  try {
    const id = parseInt(req.query.id); // Získání ID restaurace z query parametru

    // Načtení seznamu restaurací z JSON souboru
    const restauraceList = JSON.parse(
      await fs.readFile(
        path.join(__dirname, "../../storage/restaurace.json"),
        "utf8"
      )
    );

    // Najít restauraci s daným ID
    const restaurace = restauraceList.find(
      (restaurace) => restaurace.id === id
    );

    if (restaurace) {
      // Aktualizovat atributy restaurace podle poskytnutých parametrů
      for (const key in req.query) {
        if (key !== "id" && restaurace.hasOwnProperty(key)) {
          restaurace[key] = req.query[key];
        }
      }

      // Zápis aktualizovaných dat zpět do souboru
      await fs.writeFile(
        path.join(__dirname, "../../storage/restaurace.json"),
        JSON.stringify(restauraceList, null, 2)
      );

      // Odpověď s úspěšně aktualizovanými daty restaurace
      res.json(restaurace);
    } else {
      // Pokud restaurace s daným ID neexistuje, vrátíme HTTP kód 404
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (e) {
    // Pokud dojde k chybě při zpracování, vrátíme HTTP kód 500 s informací o chybě
    res.status(500).json({ message: e.message });
  }
}

module.exports = update;
