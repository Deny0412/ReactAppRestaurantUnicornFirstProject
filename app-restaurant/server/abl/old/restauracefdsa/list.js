const fs = require("fs");
const path = require("path");

async function list(req, res) {
  try {
    const userList = JSON.parse(
      await fs.promises.readFile(
        path.join(__dirname, "../../storage/restaurace.json")
      )
    );
    res.json(userList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = list;
