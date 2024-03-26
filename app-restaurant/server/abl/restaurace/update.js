const fs = require("fs");
const path = require("path");

async function update(req, res) {
  try {
    const restauraceList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../../storage/restaurace.json")
      )
    );
    const body = req.body;
    const restauraceIndex = restauraceList.findIndex(
      (restaurace) => restaurace.id === body.id
    );

    if (restauraceIndex > -1) {
      restauraceList[restauraceIndex] = body;
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }

    await fs.promises.writeFile(
      path.join(__dirname, "../../storage/restaurace.json"),
      JSON.stringify(restauraceList, null, 2)
    );
    res.json(restauraceList[restauraceIndex]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = update;
